const { cart, product } = require("../../../models");
const { keyboard } = require("../../../keyboards/cart.keyboard");
const { keyboard: editCartKeyboard } = require("../../../keyboards/edit-cart.keyboard");

async function DeleteProductAction (ctx) {
    try {
        const productId = +ctx
            .update
            .callback_query
            .data
            .split(":")[1]

        const findProduct = await product.findByPk(productId)

        const userCart = await cart.findOne({
            where: { user_id: ctx.update.callback_query.from.id },
            include: [{
                model: product
            }]
        })

        await userCart.removeProduct(findProduct);

        await ctx.deleteMessage();
        await ShowCartAction(ctx);
    } catch (e) {
        console.error(e);
    }
}

module.exports = {
    DeleteProductAction
};