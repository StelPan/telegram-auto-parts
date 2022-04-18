'use strict';

const bcrypt = require("bcrypt");
const { worker } = require("../models");
module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    const password = "qwerty12345" //
    const hash = bcrypt.hashSync(password, 0);
    return worker.create({
      user_id: 1210423576,//
      login: "administrator",
      password: hash,
    })
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
