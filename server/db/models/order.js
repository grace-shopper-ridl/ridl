const Sequelize = require('sequelize');
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

Order.prototype.combineOrders = async function(order) {
  const lineItems = await order.getLineItems();
  lineItems.forEach(lineItem => this.setLineItem(lineItem));
  return this;
};

Order.syncOrders = function(userId, orderFromStorage) {
  const userCart = Order.getCartByUser(userId);
  if (!userCart) orderFromStorage.setUser(userId);
  else userCart.combineOrders(orderFromStorage);
};

module.exports = Order;
