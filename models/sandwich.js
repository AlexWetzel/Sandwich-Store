'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sandwich = sequelize.define('Sandwich', {
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL(4,2)
  }, {});
  Sandwich.associate = function(models) {
    // associations can be defined here
  };
  return Sandwich;
};