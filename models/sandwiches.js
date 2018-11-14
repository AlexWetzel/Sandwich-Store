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

Sandwich.sync({force: true}).then(() => {
  console.log('Synch successful!')
  return Sandwich.bulkCreate([
    {name: "Roast Beef", price: 5.99},
    {name: "Turkey", price: 5.99},
    {name: "Ham", price: 5.99},
    {name: "Ultimate", price: 5.99},
    {name: "Italian", price: 5.99}
  ])
}).catch( err => {
  console.log(err);
});