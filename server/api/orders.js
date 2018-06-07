const router = require('express').Router();
const { Order, LineItem, Product } = require('../db/models');

// GET /orders
router.get('/', (req, res, next) => {
  Order.findAll({
    include: [
      {
        model: LineItem,
        include: [Product]
      }
    ]
  })
    .then(orders => res.json(orders))
    .catch(next);
});

//GET /orders/:orderId
router.get('/:orderId', (req, res, next) => {
  Order.findById(req.params.orderId, {
    include: [
      {
        model: LineItem,
        include: [Product]
      }
    ]
  })
    .then(orders => res.json(orders))
    .catch(next);
});

module.exports = router;
