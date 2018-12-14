'use strict';
module.exports = (sequelize, DataTypes) => {
  const Ingredient = sequelize.define('Ingredient', {
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    stock: DataTypes.INTEGER
  }, {});
  Ingredient.associate = function(models) {
    Ingredient.belongsToMany( models.Sandwich, {
      as: 'sandwiches',
      through: models.SandwichIngredient,
      foreignKey: 'ingredientId'
    });
  };
  return Ingredient;
};