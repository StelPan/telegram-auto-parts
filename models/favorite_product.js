'use strict';
module.exports = (sequelize, DataTypes) => {
  const favorite_product = sequelize.define('favorite_product', {
    product_id: DataTypes.INTEGER,
    favorite_id: DataTypes.INTEGER
  }, {
    underscored: true,
  });
  favorite_product.associate = function(models) {
    // associations can be defined here
  };
  return favorite_product;
};