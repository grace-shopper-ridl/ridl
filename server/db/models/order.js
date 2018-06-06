const Sequelize = require('sequelize');
const db = require('../db');

const Order = db.define('order', {
  orderNumber: {
    type: Sequelize.INTEGER
  },
  status: {
    type: Sequelize.ENUM('created', 'processing', 'cancelled', 'completed'),
    defaultValue: 'created'
  }
});

Order.prototype.total = function() {};

module.exports = Order;
