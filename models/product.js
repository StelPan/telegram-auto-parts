'use strict';

module.exports = (sequelize, DataTypes) => {
  const product = sequelize.define('product', {
    name: DataTypes.STRING,
    price: DataTypes.DOUBLE,
    description: DataTypes.TEXT,
    attribute_id: DataTypes.INTEGER,
  }, {
    underscored: true,
    // paranoid: true,
  });
  product.associate = function(models) {
    /**
     *
     */
    product.belongsToMany(models.category, {
      through: "category_products",
      foreignKey: "product_id",
    });

    /**
     *
     */
    product.belongsToMany(models.cart, {
      through: "cart_product",
      foreignKey: "product_id",
    });

    /**
     *
     */
    product.belongsToMany(models.order, {
      through: "order_items",
      foreignKey: "product_id",
    });

    /**
     *
     */
    product.belongsToMany(models.image, {
      through: "product_images"
    });

    /**
     *
     */
    product.belongsToMany(models.favorite, {
      through: "favorite_products",
    });

    product.addScope("full", ({ cart_id, favorite_id }) => {
      return {
        include: [{
          model: models.cart,
          through: {
            model: models.cart_product,
            where: { cart_id }
          },
        }, {
          model: models.favorite,
          through: {
            model: models.favorite_product,
            where: { favorite_id }
          },
        }, {
          model: models.image
        }]
      }
    })
  };
  return product;
};