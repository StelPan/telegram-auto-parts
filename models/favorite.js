'use strict';
module.exports = (sequelize, DataTypes) => {
  const favorite = sequelize.define('favorite', {
    user_id: DataTypes.INTEGER
  }, {
    underscored: true,
  });
  favorite.associate = function(models) {
    favorite.belongsToMany(models.product, {
      through: "favorite_products"
    })
  };
  return favorite;
};