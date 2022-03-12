'use strict';
module.exports = (sequelize, DataTypes) => {
  const category_product = sequelize.define('category_product', {
    category_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER
  }, {
    underscored: true
  });
  category_product.associate = function(models) {
    // associations can be defined here
  };
  return category_product;
};