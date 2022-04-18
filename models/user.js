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
    user.hasOne(models.cart);
    user.hasMany(models.order);
    user.hasOne(models.worker);
  };
  return user;
};