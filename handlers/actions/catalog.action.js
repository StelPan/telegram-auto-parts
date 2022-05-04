const path = require("path");
const { category } = require(path.resolve("models"));
const CatalogKeyboard = require("../../keyboards/catalog.keyboard");

const LIMIT_VIEW_PRODUCT = 2;

async function CatalogAction (ctx) {
    try {
        const catalog = category.findAll({ limit: LIMIT_VIEW_PRODUCT });
        const countCatalog = category.count();

        const [categories, count] = await Promise.all([
            catalog,
            countCatalog
        ]);

        const keyboard = CatalogKeyboard(categories, count, 1, LIMIT_VIEW_PRODUCT);

        const message = `Всего категорий: ${count} \r\n`;

        await ctx.reply(message, keyboard);
    } catch (e) {
        console.error(e);
    }
}

async function PaginateCatalogAction (ctx) {
    try {
        await ctx.answerCbQuery();

        const page = +ctx
            .update
            .callback_query
            .data
            .split(':')[1]

        if(!page) {
            return;
        }

        const catalog = category.findAll({
            limit: LIMIT_VIEW_PRODUCT,
            offset: LIMIT_VIEW_PRODUCT * page - LIMIT_VIEW_PRODUCT
        });

        const countCatalog = category.count();

        const [categories, count] = await Promise.all([
            catalog,
            countCatalog
        ]);

        const keyboard = CatalogKeyboard(categories, count, page, LIMIT_VIEW_PRODUCT);
        const message = `Всего категорий: ${count} \r\n`;
        await ctx.editMessageText(message, keyboard);
    } catch (e) {
        console.error(e);
    }
}

module.exports = {
    CatalogAction,
    PaginateCatalogAction
};