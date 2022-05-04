'use strict';
module.exports = (sequelize, DataTypes) => {
  const worker = sequelize.define('worker', {
    user_id: DataTypes.BIGINT,
    email: DataTypes.STRING,
    login: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    underscored: true,
  });
  worker.associate = function(models) {
    worker.belongsTo(models.user);
  };
  return worker;
};