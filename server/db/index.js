const db = require('./db');

// register models
const { Product, User, Review, Category } = require('./models');

module.exports = db;
