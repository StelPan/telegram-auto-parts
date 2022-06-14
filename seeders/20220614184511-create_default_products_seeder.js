'use strict';

const productsDataStore = require("../json-data-store/products");
const { category, image, product } = require("../models");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    const categories = await category.findAll();

    for (let categoryName in productsDataStore) {
      for (let productDataStore of productsDataStore[categoryName]) {
        const { name, price, description, created_at, updated_at, image: imageData } = productDataStore;
        const { source, type } = imageData;

        const createProduct = await product.create({
          name,
          price,
          description
        });

        const createImage = await image.create({
          source,
          type
        });

        await createProduct.addImage(createImage);

        await createProduct.setCategories([categories.find(cat => cat.name === categoryName)]);
      }
    }
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
