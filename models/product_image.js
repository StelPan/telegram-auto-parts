'use strict';
module.exports = (sequelize, DataTypes) => {
  const product_image = sequelize.define('product_image', {
    product_id: DataTypes.INTEGER,
    image_id: DataTypes.INTEGER
  }, {
    underscored: true,
  });
  product_image.associate = function(models) {
    // associations can be defined here
  };
  return product_image;
};