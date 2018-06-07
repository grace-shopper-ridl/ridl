const Sequelize = require('sequelize');
const db = require('../db');

const Order = db.define('order', {
  orderNumber: {
    type: Sequelize.INTEGER
  },
  status: {
    type: Sequelize.ENUM(
      'cart',
      'created',
      'processing',
      'cancelled',
      'completed'
    ),
    defaultValue: 'cart'
  },
  // eventually we want to be able to calculate the subtotal from qty and price in lineitem model
  subTotal: {
    type: Sequelize.DECIMAL
  }
});

module.exports = Order;
