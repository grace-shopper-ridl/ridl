const router = require('express').Router();
const { User, Order } = require('../db/models');
module.exports = router;

router.get('/', (req, res, next) => {
  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['id', 'email']
  })
    .then(users => res.json(users))
    .catch(next);
});

// GET /api/users/:userId/cart
router.get('/:userId/cart', (req, res, next) => {
  Order.getCartByUser(req.params.userId)
    .then(order => {
      if (!order) return Order.create({ userId: req.params.userId });
      return order;
    })
    .then(order => res.send(order))
    .catch(next);
});
