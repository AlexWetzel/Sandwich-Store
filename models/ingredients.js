const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize.js');

const Ingredient = sequelize.define('ingredient', {
  name: {
    type: Sequelize.STRING
  },
  type: {
    type: Sequelize.STRING
  }
}, {
  timestamps: false
});

module.exports = Ingredient;