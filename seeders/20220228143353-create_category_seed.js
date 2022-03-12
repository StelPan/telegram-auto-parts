'use strict';

const { category, product: productModel, category_product } = require("../models")
const jsonCategoryProducts = require("../json/category-products.json")

module.exports = {
    up: (queryInterface, Sequelize) => {
        async function bulk () {
            for (let data of jsonCategoryProducts) {
                let { category: categories, products } = data
                const createCategory = await category.create(categories)
                for (let productInfo of products) {
                    const createProduct = await productModel.create(productInfo)
                    await category_product.create({
                        category_id: createCategory.id,
                        product_id: createProduct.id
                    })
                }
            }
        }

        return bulk()
        //return queryInterface.bulkInsert('categories', [], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('categories', null, {});
    }
};
