'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('SandwichIngredients', [
        {sandwichId: 1, ingredientId: 3, quantity: 2, createdAt: new Date(), updatedAt: new Date()},
        {sandwichId: 2, ingredientId: 2, quantity: 2, createdAt: new Date(), updatedAt: new Date()},
        {sandwichId: 3, ingredientId: 1, quantity: 2, createdAt: new Date(), updatedAt: new Date()},
        {sandwichId: 4, ingredientId: 1, quantity: 1, createdAt: new Date(), updatedAt: new Date()},
        {sandwichId: 4, ingredientId: 2, quantity: 1, createdAt: new Date(), updatedAt: new Date()},
        {sandwichId: 4, ingredientId: 3, quantity: 1, createdAt: new Date(), updatedAt: new Date()},
        {sandwichId: 5, ingredientId: 1, quantity: 1, createdAt: new Date(), updatedAt: new Date()},
        {sandwichId: 5, ingredientId: 4, quantity: 1, createdAt: new Date(), updatedAt: new Date()}
      ], {});

  },

  down: (queryInterface, Sequelize) => { 
    return queryInterface.bulkDelete('SandwichIngredients', null, {});
  }
};
