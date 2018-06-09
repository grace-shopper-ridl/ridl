const Sequelize = require('sequelize');
const db = require('../db');

const Review = db.define('review', {
	title: {
		type: Sequelize.STRING,
		allowNull: false,
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
		type: Sequelize.TEXT,
		allowNull: false,
		validate: {
			notEmpty: false,
			len: [1, 700]
		}
	}
});

module.exports = Review;
