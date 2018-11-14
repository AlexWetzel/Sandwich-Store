const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize.js');

const User = sequelize.define('user', {
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  },
  pin: {
    type: Sequelize.INTEGER(4)
  },
  permissionLVL: {
    type: Sequelize.STRING
  },
}, {
  timestamps: false
});

module.exports = User;