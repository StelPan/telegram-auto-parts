const { cart, product } = require("../../../models");
const { editProductKeyboard } = require("../../../keyboards/product.inline");

async function AddToCart(ctx) {
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
}

module.exports = AddToCart;