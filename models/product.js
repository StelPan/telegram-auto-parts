'use strict';
module.exports = (sequelize, DataTypes) => {
  const product = sequelize.define('product', {
    name: DataTypes.STRING,
    price: DataTypes.DOUBLE,
    description: DataTypes.TEXT,
    attribute_id: DataTypes.INTEGER,
  }, {
    underscored: true
  });
  product.associate = function(models) {
    product.belongsToMany(models.category, {
      through: "category_products",
      foreignKey: "product_id",
    })

    product.belongsToMany(models.cart, {
      through: "cart_product",
      foreignKey: "product_id",
    })

    product.belongsToMany(models.image, {
      through: "product_images"
    })

    product.belongsToMany(models.favorite, {
      through: "favorite_products",
    })
  };
  return product;
};