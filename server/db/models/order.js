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
  await Promise.all(
    lineItems.map(lineItem => {
      return lineItem.setOrder(this);
    })
  );
  const updated = await Order.findById(this.id, {
    include: [
      {
        model: LineItem,
        include: [Product]
      }
    ]
  });
  return updated;
};

Order.syncOrders = async function(userId, orderFromStorageId) {
  const userCart = await Order.getCartByUser(userId);
  const storageCart = await Order.findById(orderFromStorageId);
  if (!userCart) {
    await storageCart.setUser(userId);
    return storageCart;
  } else {
    const updatedOrder = await userCart.combineOrders(storageCart);
    storageCart.destroy();
    return updatedOrder;
  }
};

module.exports = Order;
