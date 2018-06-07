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

module.exports = router;
