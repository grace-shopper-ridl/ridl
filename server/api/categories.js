const router = require('express').Router();
const { Category, Review } = require('../db/models');

router.get('/', (req, res, next) => {
  Category.findAll()
    .then(categories => res.json(categories))
    .catch(next);
});

router.get('/:categoryId', (req, res, next) => {
  Category.findById(req.params.categoryId)
    .then(category => category.getProducts({ include: [{ model: Review }] }))
    .then(products => res.json(products))
    .catch(next);
});

module.exports = router;
