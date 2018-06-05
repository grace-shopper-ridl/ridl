const User = require('./user');
const Product = require('./product');
const Category = require('./category');

Product.belongsToMany(Category, { through: 'ProductCategory' });
Category.belongsToMany(Product, { through: 'ProductCategory' });

// Products Model methods
// getCategories, setCategories, addCategories, addCategories

// Categories Model methods
// getProducts, setProducts, addProduct, addProducts

module.exports = {
  User,
  Product,
  Category
};
