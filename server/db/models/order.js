const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const db = require('../db');
const Product = require('./product');
const LineItem = require('./lineItem');

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

Order.getCartByUser = function(userId) {
  return Order.findOne({
    where: {
      userId,
      status: 'cart'
    },
    include: {
      model: LineItem,
      include: [Product]
    }
  });
};

Order.getOrdersByUser = function(userId) {
  return Order.findAll({
    where: {
      userId,
      status: {
        [Op.ne]: 'cart'
      }
    },
    include: {
      model: LineItem,
      include: [Product]
    }
  });
}

module.exports = Order;
