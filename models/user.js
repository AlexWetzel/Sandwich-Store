'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    FirstName: DataTypes.STRING,
    LastName: DataTypes.STRING,
    Pin: DataTypes.INTEGER,
    Access: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};