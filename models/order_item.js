'use strict';
module.exports = (sequelize, DataTypes) => {
  const order_item = sequelize.define('order_item', {
    order_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  }, {
    underscored: true,
  });
  order_item.associate = function(models) {
    // associations can be defined here
  };
  return order_item;
};