'use strict';
const underscore = require("underscore");
module.exports = (sequelize, DataTypes) => {
  const cart = sequelize.define('cart', {
    user_id: DataTypes.INTEGER,
    data: DataTypes.JSONB
  }, {
    underscored: true
  });
  cart.associate = function(models) {
    cart.belongsToMany(models.product, {
      through: "cart_products",
      foreignKey: "cart_id",
    })
  };
  return cart;
};