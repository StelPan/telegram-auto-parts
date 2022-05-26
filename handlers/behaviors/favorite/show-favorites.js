const path = require("path");
const {favorite, cart} = require("../../../models");
const favoriteKeyboard = require("../../../keyboards/favorite.inline");

async function ShowFavorites (ctx) {
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
}

module.exports = {
    ShowFavorites,
};