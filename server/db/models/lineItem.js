const Sequelize = require('sequelize');
const db = require('../db');

const LineItem = db.define('lineItem', {
  qty: {
    type: Sequelize.INTEGER
  },
  price: {
    type: Sequelize.DECIMAL
  }
});

module.exports = LineItem;
