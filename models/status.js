'use strict';
module.exports = (sequelize, DataTypes) => {
  const status = sequelize.define('status', {
    name: DataTypes.STRING,
    color: DataTypes.STRING
  }, {
    underscored: true,
  });
  status.associate = function(models) {
    status.hasMany(models.order);
  };
  return status;
};