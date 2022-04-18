'use strict';

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
    return queryInterface.bulkInsert('statuses', [{
      name: "В обработке",
      color: "#f9d848",
      created_at: new Date(),
      updated_at: new Date()
    }, {
      name: "Ожидает доставки",
      color: "#3e89f9",
      created_at: new Date(),
      updated_at: new Date()
    }, {
      name: "Отклонен",
      color: "#ff0015",
      created_at: new Date(),
      updated_at: new Date()
    }]);
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
