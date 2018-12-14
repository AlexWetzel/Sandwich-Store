'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Sandwiches', [
      {name: "Roast Beef", price: 5.99, createdAt: new Date(), updatedAt: new Date()},
      {name: "Turkey", price: 5.99, createdAt: new Date(), updatedAt: new Date()},
      {name: "Ham", price: 5.99, createdAt: new Date(), updatedAt: new Date()},
      {name: "Ultimate", price: 5.99, createdAt: new Date(), updatedAt: new Date()},
      {name: "Italian", price: 5.99, createdAt: new Date(), updatedAt: new Date()}
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Sandwiches', null, {});
  }
};
