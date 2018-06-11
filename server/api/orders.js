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

router.post('/:orderId/checkout', (req, res, next) => {
  if (req.body.token) {
    Order.update(
      { status: 'created', subTotal: req.body.amount },
      {
        where: { id: req.params.orderId },
        returning: true,
        plain: true
      }
    )
      .then(order => res.json(order))
      .catch(next);
  } else {
    res.status(400).send('payment could not be processed');
  }
});

// POST /orders/:orderId/listItems
router.post('/:orderId/lineItems', (req, res, next) => {
  Order.findById(req.params.orderId)
    .then(order =>
      LineItem.create(req.body).then(created => created.setOrder(order)))
    .then(updated =>
      LineItem.findById(updated.id, { include: [{ model: Product }] }))
    .then(lineItem => res.json(lineItem))
    .catch(next);
});

// PUT /orders/:orderId/lineItems/:lineItemId
router.put('/:orderId/lineItems/:lineItemId', (req, res, next) => {
  LineItem.update(req.body, {
    where: { id: req.params.lineItemId },
    returning: true,
    plain: true
  })
    .then(() => {
      return LineItem.findAll({
        where: {
          orderId: req.params.orderId
        },
        include: [{ model: Product }]
      });
    })
    .then(lineItems => res.send(lineItems))
    .catch(next);
});

// DELETE /orders/:orderId/lineItems/:lineItemId
router.delete('/:orderId/lineItems/:lineItemId', (req, res, next) => {
  let forbidden;
  LineItem.findById(req.params.lineItemId)
    .then(item => {
      return item.getOrder().then(order => {
        if (order.status !== 'cart') {
          forbidden = { status: 403, message: 'FORBIDDEN' };
        } else {
          return item.destroy();
        }
      });
    })
    .then(() => {
      return LineItem.findAll({
        where: {
          orderId: req.params.orderId
        },
        include: { model: Product }
      });
    })
    .then(lineItems => {
      if (forbidden) res.status(403).json(forbidden);
      else res.json(lineItems);
    })
    .catch(next);
});

// PUT /orders/:orderId/syncCart
router.put('/:orderId/syncCart', (req, res, next) => {
  Order.syncOrders(req.body.id, req.params.orderId)
    .then(updatedOrder => {
      res.send(updatedOrder);
    })
    .catch(next);
});

module.exports = router;
