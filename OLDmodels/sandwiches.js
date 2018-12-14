const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize.js');

const Sandwich = sequelize.define('sandwich', {
  name: {
    type: Sequelize.STRING
  },
  price: {
    type: Sequelize.DECIMAL(4,2)
  },
}, {
  timestamps: false
});

module.exports = Sandwich;