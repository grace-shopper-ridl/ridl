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
  total: {
    type: Sequelize.VIRTUAL,
    get() {
      return this.getTotal();
    }
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

Order.prototype.getTotal = function() {
  let total = 0;
  return this.getLineItems().then(lineItems => {
    lineItems.forEach(lineItem => {
      if (!lineItem.qty) total += lineItem.price;
      else total += lineItem.price * lineItem.qty;
    });
    return total;
  });
};

module.exports = Order;
