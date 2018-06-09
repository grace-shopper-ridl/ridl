'use strict';

const db = require('../server/db');
const { User, Product, Category } = require('../server/db/models');
const productData = require('./products.json')
const categoryData = require('./categories.json')

async function seed() {
  await db.sync({ force: true });
  console.log('db synced!');

  const users = await Promise.all([
    User.create({ email: 'cody@email.com', password: '123' }),
    User.create({ email: 'murphy@email.com', password: '123' })
  ]);

	const categories = await Promise.all(
		categoryData.map(category => Category.create(category))
	);

// this helper function matches the category in our seed data
// with a category we just created
const findMatchingCategory = categoryInJson => {
	return categories.find(categoryInDb => {
		return categoryInDb.type === categoryInJson.type
	})
};

	// For each product, loop through the 'categories' array,
	// find the matching category from the categories we just created,
	// and add that category to the product
  const products = await Promise.all(
    productData.map(async product => {
			const createdProduct = await Product.create(product)
			if (product.hasOwnProperty('categories')){
				await Promise.all(
					product.categories.map(async categoryInJson => {
						const matchingCategoryInDb = findMatchingCategory(categoryInJson)
						await createdProduct.addCategory(matchingCategoryInDb)
					})
				)
			}
		})
	);

  console.log(`seeded ${users.length} users`);
  console.log(`seeded ${products.length} products`);
	console.log(`seeded ${categories.length} categories`);
  console.log(`seeded successfully`);
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  seed()
    .catch(err => {
      console.error(err);
      process.exitCode = 1;
    })
    .then(() => {
      console.log('closing db connection');
      db.close();
      console.log('db connection closed');
    });
  /*
   * note: everything outside of the async function is totally synchronous
   * The console.log below will occur before any of the logs that occur inside
   * of the async function
   */
  console.log('seeding...');
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
