const path = require("path");
const { category, product } = require(path.resolve("models"));
const CatalogKeyboard = require(path.resolve("keyboards", "catalog.keyboard"));

async function CatalogAction (ctx) {
    try {
        const catalog = category.findAll({ limit: 2 });
        const countCatalog = category.count();

        const [categories, count] = await Promise.all([
            catalog,
            countCatalog
        ]);

        const totalCountProduct = await product.count();

        if (count === 0) {
            return await ctx.reply("Категории отсутствуют..");
        }

        const keyboard = CatalogKeyboard(categories, count, 1, 2);

        const message = `Всего доступных категорий: ${count} \r\n` +
            `Общее количество товаров в приложении: ${totalCountProduct}.`;

        await ctx.reply(message, keyboard);
    } catch (e) {
        console.error(e);
    }
}

module.exports = {
    CatalogAction
};