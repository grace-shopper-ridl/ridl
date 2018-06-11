const router = require('express').Router();
const { Order } = require('../db/models');

//GET /orders/my-orders
router.get('/', (req, res, next) => {
  if (!req.user) {
    res.status(403).json('FORBIDDEN');
    return;
  }

  Order.getOrdersByUser(req.user.id)
    .then(orders => res.json(orders))
    .catch(next);
});

module.exports = router;
