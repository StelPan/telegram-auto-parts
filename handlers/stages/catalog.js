const { Composer } = require("telegraf");
const CatalogKeyboard = require("../../keyboards/catalog.keyboard");
const { editProductKeyboard } = require("../../keyboards/product.inline");
const { category, product, cart, favorite } = require("../../models");
const { keys } = require("../../keyboards/start.keyboard");

const composer = new Composer();

const LIMIT_VIEW_PRODUCT = 2

composer.hears(keys.CATALOG_TYPE,async (ctx) => {
    const catalog = category.findAll({ limit: LIMIT_VIEW_PRODUCT });
    const countCatalog = category.count();

    const [categories, count] = await Promise.all([
        catalog,
        countCatalog
    ]);

    const keyboard = CatalogKeyboard(categories, count, 1, LIMIT_VIEW_PRODUCT);

    const message = `Всего категорий: ${count} \r\n`;

    await ctx.reply(message, keyboard);
});

/**
 * Пагинация
 */
composer.action(/^PAGE:[0-9]+$/, async (ctx) => {
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
});

composer.action(/(CATEGORY:[0-9]+|PAGE_PRODUCT:[0-9]+)/, require("../scenes/actions/view-product.action"));

/**
 * Добавление в корзину
 */
composer.action(/ADD_TO_CART:[0-9]+/, async (ctx) => {
    try {
        const [, productId] = ctx.update.callback_query.data.split(":");
        const userId        = ctx.update.callback_query.from.id

        const findOrCreateCart = await cart.findOrCreate({ where: { user_id: userId } })
        const userCart = findOrCreateCart[0];

        const {
            reply_markup,
            caption
        } = ctx.update.callback_query.message

        let inlineKeyboard = editProductKeyboard(reply_markup.inline_keyboard)

        const findProduct = await product.findByPk(+productId)

        const productInCartExist = await userCart.getProducts({ where: { id: findProduct.id }});

        if (productInCartExist.length) {
            await userCart.removeProduct(findProduct.id);
            inlineKeyboard.editCartButton("В корзину")
        } else {
            await userCart.addProduct(findProduct.id);
            inlineKeyboard.editCartButton("В корзине")
        }

        inlineKeyboard =
            inlineKeyboard
                .arrayToInline()
                .getKeyboard()

        await ctx.editMessageCaption(caption, {
            parse_mode: "Markdown",
            ...inlineKeyboard
        })
    } catch (e) {
        console.error(e)
    }
})

composer.action(/ADD_TO_FAVORITE:[0-9]+/, async (ctx) => {
    try {
        const callbackQuery = ctx.update.callback_query;

        const {
            data,
            message: {
                reply_markup,
                caption
            },
            from: { id }
        } = callbackQuery;

        const productId = data
            .split(":")
            .pop();

        const [favorites, created]  = await favorite.findOrCreate({where: { user_id: id }});
        const products              = await product.findByPk(productId);

        const keyboard = editProductKeyboard(reply_markup.inline_keyboard);

        const isExistFavoriteProduct = await favorites.getProducts({
            where: { id: products.id }
        });

        if (!isExistFavoriteProduct.length) {
            keyboard.editFavoriteButton("В избранном");
            await favorites.addProduct(products);
        } else {
            keyboard.editFavoriteButton("В избранное");
            await favorites.removeProduct(products);
        }

        await ctx.editMessageCaption(caption, {
            parse_mode: "Markdown",
            ...keyboard
                .arrayToInline()
                .getKeyboard()
        })
    } catch (e) {
        console.error(e);
    }
})

composer.action(/GO_TO_HOME/, async (ctx) => {
    await ctx.deleteMessage();
    await ctx.scene.leave();
});

composer.action(/GO_TO_CATALOG/, async (ctx) => {
    await ctx.answerCbQuery();
    await ctx.deleteMessage();

    // await ctx.scene.enter("CatalogScene");
})

module.exports = composer;