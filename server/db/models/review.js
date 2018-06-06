const Sequelize = require('sequelize');
const db = require('../db');

const Review = db.define('review', {
	title: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			notEmpty: false,
		}
	},
	rating: {
		type: Sequelize.INTEGER,
		allowNull: false,
		validate: {
			notEmpty: false,
			min: 1,
			max: 5
		}
	},
	description: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			notEmpty: false,
			len: [25, 200]
		}
	}
});

module.exports = Review;
