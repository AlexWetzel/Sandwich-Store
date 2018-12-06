const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize.js');

const Order = sequelize.define('order', {
  orderNumber: {
    type: Sequelize.INTEGER(6).ZEROFILL,
  },
  sandwichId: {
    type: Sequelize.INTEGER
  }
});

Order.sync().then(() => {
  console.log('Synch successful!')
}).catch( err => {
  console.log(err);
});

module.exports = Order;