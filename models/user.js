'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    information: DataTypes.JSONB,
    balance: DataTypes.DOUBLE
  }, {
    underscored: true
  });
  user.associate = function(models) {
    user.hasOne(models.favorite);
  };
  return user;
};