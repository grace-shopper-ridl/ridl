const Sequelize = require("sequelize");
const db = require("../db");

const Product = db.define("product", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
});

module.exports = Product;
