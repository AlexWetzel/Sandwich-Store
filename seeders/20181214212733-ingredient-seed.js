'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Ingredients', [
      {name: 'Ham', type: 'meat', stock: 200, createdAt: new Date(), updatedAt: new Date()},
      {name: 'Turkey', type: 'meat', stock: 200, createdAt: new Date(), updatedAt: new Date()},
      {name: 'Roast Beef', type: 'meat', stock: 200, createdAt: new Date(), updatedAt: new Date()},
      {name: 'Salami', type: 'meat', stock: 100, createdAt: new Date(), updatedAt: new Date()},
      {name: 'Mayonnaise', type: 'sauce', stock: 100, createdAt: new Date(), updatedAt: new Date()},
      {name: 'Yellow Mustard', type: 'sauce', stock: 100, createdAt: new Date(), updatedAt: new Date()},
      {name: 'Honey Mustard', type: 'sauce', stock: 100, createdAt: new Date(), updatedAt: new Date()},
      {name: 'Dijon Mustard', type: 'sauce', stock: 100, createdAt: new Date(), updatedAt: new Date()},
      {name: 'Horseradish Mayo', type: 'sauce', stock: 100, createdAt: new Date(), updatedAt: new Date()},
      {name: 'Cheddar', type: 'cheese', stock: 100, createdAt: new Date(), updatedAt: new Date()},
      {name: 'Swiss', type: 'cheese', stock: 100, createdAt: new Date(), updatedAt: new Date()},
      {name: 'Provolone', type: 'cheese', stock: 100, createdAt: new Date(), updatedAt: new Date()},
      {name: 'Lettuce', type: 'veggies', stock: 100, createdAt: new Date(), updatedAt: new Date()},
      {name: 'Tomato', type: 'veggies', stock: 100, createdAt: new Date(), updatedAt: new Date()},
      {name: 'Red Onion', type: 'veggies', stock: 100, createdAt: new Date(), updatedAt: new Date()},
      {name: 'Pickles', type: 'veggies', stock: 100, createdAt: new Date(), updatedAt: new Date()},
      {name: 'Olives', type: 'veggies', stock: 100, createdAt: new Date(), updatedAt: new Date()},
      {name: 'Banana Peppers', type: 'veggies', stock: 100, createdAt: new Date(), updatedAt: new Date()},
      {name: 'Jalapenos', type: 'veggies', stock: 100, createdAt: new Date(), updatedAt: new Date()}
    ], {});    
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Ingredients', null, {});
  }
};
