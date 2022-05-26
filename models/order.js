'use strict';
module.exports = (sequelize, DataTypes) => {
  const order = sequelize.define('order', {
    user_id: DataTypes.INTEGER,
    discount_id: DataTypes.INTEGER,
    status_id: DataTypes.INTEGER,
    total_cash: DataTypes.INTEGER,
    data: DataTypes.JSONB,
    worker_comments: DataTypes.STRING,
    admin_description: DataTypes.STRING
  }, {
    underscored: true,
    paranoid: true
  });
  order.associate = function(models) {
    /**
     *
     */
    order.belongsTo(models.user);

    /**
     *
     */
    order.belongsTo(models.status);

    /**
     *
     */
    order.belongsToMany(models.product, {
      through: "order_items",
      foreignKey: "order_id",
    });
  };
  return order;
};