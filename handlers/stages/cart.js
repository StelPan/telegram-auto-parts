const path = require("path");
const { Composer } = require("telegraf");
const { cart, favorite } = require("../../models");
const {
    ShowCartAction,
    EditCartAction,
    ClearCartAction,
    DeleteProductAction
} = require("../actions/cart.action");
const { DeleteFavoriteProduct } = require("../actions/favorite.action");
const favoriteKeyboard = require("../../keyboards/favorite.inline");
const { editProductKeyboard } = require("../../keyboards/product.inline");
const { keys } = require("../../keyboards/start.keyboard");

const composer = new Composer();

composer.hears(keys.CART_TYPE, ShowCartAction);

composer.action(/CLEAR_CART/, ClearCartAction);

composer.action(/^CART_DELETE_PRODUCT:[0-9]+$/, DeleteProductAction);

composer.action(/^DELETE_FAVORITE_PRODUCT:[0-9]+$/, DeleteFavoriteProduct);

composer.action(/^CART_EDIT_PAGE:[0-9]+$/, EditCartAction);

composer.action(/^CART_EDIT_BACK$/, async (ctx) => {
    await ctx.deleteMessage();
    await ShowCartAction(ctx);
})

composer.action(/^SHOW_FAVORITES:[0-9]+$/, async (ctx) => {
    try {
        const {
            data,
            from: { id }
        } = ctx.update.callback_query;

        const page = data
            .split(":")
            .pop();

        const [favorites, ] = await favorite.findOrCreate({where: {user_id: id}});
        const [carts, ]     = await cart.findOrCreate({where: {user_id: id}})

        const products = await favorites.getProducts({
            limit: 1,
            offset: page - 1,
            scope: [{ method: ["full", {favorite_id: favorites.id, cart_id: carts.id}]}]
        });

        const count = await favorites.countProducts();
        if (!count) {
            await ctx.answerCbQuery("Избранные товары отсутствуют.");
            return;
        }

        const product = products[0];

        const message =
            `Название: ${product.get("name")} \r\n` +
            `Цена: ${product.get("price") + "руб."} \r\n` +
            `Описание: ${product.get("description")} \r\n`;

        const keyboard = favoriteKeyboard(product.id, +page, count);

        if (product.get("carts").length) {
            keyboard.reply_markup.inline_keyboard[0][0].text = "В корзине"
        } else {
            keyboard.reply_markup.inline_keyboard[0][0].text = "В корзину"
        }

        const sourceHttp = process.env.TELEGRAM_WEBHOOK_URL + `/images/${product.get("images")[0].source}`

        let source = product.get("images")[0]?.source ? path.resolve(
            "storage",
            "images",
            product.get("images")[0]?.source
        ) : null;

        if (!source) {
            return ctx.answerCbQuery("Отсутвует фотография товара");
        }

        const isSendingPhoto = ctx
            .update
            .callback_query
            .message
            ?.photo
            ?.length;

        const method = !isSendingPhoto ?
            "replyWithPhoto" :
            "editMessageMedia";

        !isSendingPhoto ?
            await ctx.deleteMessage() :
            "";

        const params = !isSendingPhoto ?
            [{ source }, {
                caption: message,
                parse_mode: "Markdown",
                ...keyboard
            }] : [{ media: sourceHttp, type: "photo", caption: message, }, {
                parse_mode: "Markdown",
                ...keyboard
            }];

        await ctx.answerCbQuery();
        await ctx[method](...params);
    } catch (e) {
        console.error(e);
    }
})

composer.action(/ADD_CART_PRODUCT_FROM_FAVORITE:[0-9]+/, async (ctx) => {
    try {
        const { callback_query } = ctx.update;

        const {
            data,
            message: { reply_markup, caption },
            from: { id }
        } = callback_query;

        const [_, productId] = data.split(":");

        const [userCart, ] = await cart.findOrCreate({where: {user_id: id}});

        const editKeyboard = editProductKeyboard(reply_markup.inline_keyboard);

        const exist = await userCart.getProducts({ where: { id: productId }});

        exist.length ?
            await userCart.removeProduct(productId) :
            await userCart.addProduct(productId);

        exist.length ?
            editKeyboard.editCartButton("В корзину") :
            editKeyboard.editCartButton("В корзине");

        await ctx.editMessageCaption(caption, {
            parse_mode: "Markdown",
            ...editKeyboard
                .arrayToInline()
                .getKeyboard()
        });
    } catch (e) {
        console.error(e);
    }
});

composer.action(/ORDER_COMPLETE/, async (ctx) => {
    await Promise.all([
        ctx.scene.enter("CompleteOrder"),
    ]);
})

module.exports = composer;