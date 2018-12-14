'use strict';
module.exports = (sequelize, DataTypes) => {
  const SandwichIngredient = sequelize.define('SandwichIngredient', {
    sandwichId: DataTypes.INTEGER,
    ingredientId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  }, {});
  SandwichIngredient.associate = function(models) {
    // associations can be defined here
  };
  return SandwichIngredient;
};