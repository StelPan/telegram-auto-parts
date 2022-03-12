'use strict';
module.exports = (sequelize, DataTypes) => {
  const product_attibutes = sequelize.define('product_attibutes', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    attributes: DataTypes.JSONB
  }, {
    underscored: true
  });
  product_attibutes.associate = function(models) {
    // associations can be defined here
  };
  return product_attibutes;
};