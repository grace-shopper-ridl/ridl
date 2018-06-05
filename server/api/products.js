const router = require('express').Router();
const { Product } = require('../db/models');

router.get('/', (req, res, next) => {
	// Add a scope to the `Product.findAll` request to get all related categories
	// Note: this hasn't been defined on the model yet
	Product.findAll()
		.then(products => res.json(products))
		.catch(next)
})

module.exports = router;
