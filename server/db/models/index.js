const User = require('./user');
const Product = require('./product');
const Category = require('./category');
const Review = require('./review');
const Order = require('./order');
const LineItem = require('./lineItem');

// Product-category relationship
Product.belongsToMany(Category, { through: 'ProductCategory' });
Category.belongsToMany(Product, { through: 'ProductCategory' });

// Review-product relationship
Review.belongsTo(Product);
Product.hasMany(Review);

// Review-user relationship
Review.belongsTo(User);
User.hasMany(Review);

// Products Model methods
// getCategories, setCategories, addCategories, addCategories
// getReviews, setReviews, createReview, addReview, addReviews, removeReview, removeReviews, hasReview, hasReviews, and countReviews

// Categories Model methods
// getProducts, setProducts, addProduct, addProducts

// Reviews Model methods
// getProduct, setProduct, createProduct
// getUser, setUser, createUser

// User Model methods
// getReviews, setReviews, createReview, addReview, addReviews, removeReview, removeReviews, hasReview, hasReviews, and countReviews

// Product to line-item relationship
Product.hasMany(LineItem);
LineItem.belongsTo(Product);

// Order to line-item relationship
Order.hasMany(LineItem);
LineItem.belongsTo(Order);

module.exports = {
  User,
  Product,
  Category,
  Review,
  Order,
  LineItem
};
