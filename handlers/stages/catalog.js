const { Composer } = require("telegraf");
const { CatalogAction, PaginateCatalogAction } = require("../actions/catalog.action");
const { editProductKeyboard } = require("../../keyboards/product.inline");
const { product, cart, favorite } = require("../../models");
const { keys } = require("../../keyboards/start.keyboard");

const composer = new Composer();

const LIMIT_VIEW_PRODUCT = 2

// Отображение категорий товаров
composer.hears(keys.CATALOG_TYPE, CatalogAction);

// Вывод категорий в постраничной пагинации
composer.action(/^PAGE:[0-9]+$/, PaginateCatalogAction);

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
});

composer.action(/GO_TO_CATALOG/, async (ctx) => {
    await ctx.answerCbQuery();
    await ctx.deleteMessage();
})

module.exports = composer;