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

// POST /orders
router.post('/', (req, res, next) => {
  // expecting orderId to be on the req body
  Order.findById(req.body.orderId, {
    include: [
      {
        model: LineItem,
        include: [Product]
      }
    ]
  })
    .then(order => {
      if (!order || order.status !== 'cart') {
        return Order.create();
      }
      return order;
    })
    .then(order => res.send(order))
    .catch(next);
});

// POST /orders/:orderId/listItems
router.post('/:orderId/lineItems', (req, res, next) => {
  Order.findById(req.params.orderId)
    .then(order => {
      LineItem.create(req.body).then(lineItem => {
        lineItem.setOrder(order);
        res.send(lineItem);
      });
    })
    .catch(next);
});

module.exports = router;
