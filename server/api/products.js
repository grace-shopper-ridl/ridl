const router = require('express').Router();
const { Product } = require('../db/models');

router.get('/', (req, res, next) => {
	// To make our lives easier, we could add a scope to the `Product.findAll` request to get all related categories; this scope would also need to be defined on the Product model
	Product.findAll()
		.then(products => res.json(products))
		.catch(next)
})

module.exports = router;
