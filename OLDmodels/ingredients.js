const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize.js');

const Ingredient = sequelize.define('ingredient', {
  name: {
    type: Sequelize.STRING
  },
  type: {
    type: Sequelize.STRING
  },
  stock: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
}, {
  timestamps: false
});

module.exports = Ingredient;