'use strict';
module.exports = (sequelize, DataTypes) => {
  const image = sequelize.define('image', {
    type: DataTypes.STRING,
    source: DataTypes.STRING
  }, {
    underscored: true,
  });
  image.associate = function(models) {
    image.belongsToMany(models.product, {
      foreignKey: "image_id",
      through: "product_images"
    })
  };
  return image;
};