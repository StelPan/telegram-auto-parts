const { favorite, product } = require("../../../models");
const {editProductKeyboard} = require("../../../keyboards/product.inline");

async function AddToFavorite (ctx) {
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
}

module.exports = AddToFavorite;