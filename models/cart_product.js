'use strict';
module.exports = (sequelize, DataTypes) => {
  const cart_product = sequelize.define('cart_product', {
    product_id: DataTypes.INTEGER,
    cart_id: DataTypes.INTEGER
  }, {
    underscored: true
  });
  cart_product.associate = function(models) {};
  return cart_product;
};