'use strict';
module.exports = (sequelize, DataTypes) => {
  const category = sequelize.define('category', {
    name: DataTypes.STRING,
    is_show: DataTypes.BOOLEAN
  }, {
    underscored: true
  });
  // category.addScope("includesAll", )
  category.associate = function(models) {
    category.belongsToMany(models.product, {
      through: "category_products",
      foreignKey: "category_id",
    })
  };

  return category;
};