'use strict';
module.exports = (sequelize, DataTypes) => {
  const token = sequelize.define('token', {
    client_id: DataTypes.INTEGER,
    refresh: DataTypes.STRING,
    expire: DataTypes.BIGINT,
    ip: DataTypes.STRING
  }, {
    underscored: true,
  });
  token.associate = function(models) {
    // associations can be defined here
  };
  return token;
};