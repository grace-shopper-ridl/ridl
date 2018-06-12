const router = require('express').Router();
const { Product } = require('../db/models');
const { Review } = require('../db/models');
const { Category } = require('./categories');

router.get('/', (req, res, next) => {
  // To make our lives easier, we could add a scope to the `Product.findAll` request to get all related categories; this scope would also need to be defined on the Product model
  Product.findAll({ include: [{ all: true }] })
    .then(products => res.json(products))
    .catch(next);
});

router.get('/:productId', (req, res, next) => {
  Product.findById(req.params.productId, {
    include: [{ all: true, nested: true }]
  })
    .then(product => res.json(product))
    .catch(next);
});

router.post('/:productId/reviews', (req, res, next) => {
  if (!req.user) {
    res.status(403).json('FORBIDDEN');
    return;
  }
  Product.findById(req.params.productId)
    .then(product => {
      const { title, description, userId, rating } = req.body;
      return Review.create({ title, description, userId, rating }).then(
        review => review.setProduct(product)
      );
    })
    .then(updated => res.json(updated))
    .catch(next);
});

module.exports = router;
