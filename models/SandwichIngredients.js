const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize.js');
const db = require('../models');

const SandwichIngredients = sequelize.define('sandwichIngredient', {
  sandwichId: {
    type: Sequelize.INTEGER
  },
  ingredientId: {
    type: Sequelize.INTEGER
  },
  quantity: {
    type: Sequelize.INTEGER
  }
}, {
  timestamps: false
});

// db.Sandwich.belongsToMany( db.Ingredient, {
//   as: 'sandwiches',
//   through: SandwichIngredients,
//   foreignKey: 'sandwichId'
// });

// db.Ingredient.belongsToMany( db.Sandwich, {
//   as: 'meats',
//   through: SandwichIngredients,
//   foreignKey: 'ingredientId'
// });

module.exports = SandwichIngredients