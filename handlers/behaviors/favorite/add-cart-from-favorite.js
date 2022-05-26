const {cart} = require("../../../models");
const {editProductKeyboard} = require("../../../keyboards/product.inline");

async function AddCartFromFavorite (ctx) {
    try {
        const {callback_query} = ctx.update;

        const {
            data,
            message: {reply_markup, caption},
            from: {id}
        } = callback_query;

        const [_, productId] = data.split(":");

        const [userCart,] = await cart.findOrCreate({where: {user_id: id}});

        const editKeyboard = editProductKeyboard(reply_markup.inline_keyboard);

        const exist = await userCart.getProducts({where: {id: productId}});

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
}

module.exports = {
    AddCartFromFavorite
};