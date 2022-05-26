const { cart, product } = require("../../../models");
const { keyboard } = require("../../../keyboards/cart.keyboard");
const { keyboard: editCartKeyboard } = require("../../../keyboards/edit-cart.keyboard");

async function ClearCartAction (ctx) {
    try {
        await ctx.answerCbQuery();
        await ctx.deleteMessage();

        const userCart = await cart.findOne({
            where: { user_id: ctx.from.id },
            include: [{
                model: product
            }]
        });

        const userProducts = await userCart.getProducts()

        for (let product of userProducts) {
            await userCart.removeProduct(product);
        }

        await ctx.reply("Ваша корзина пуста...");
    } catch (e) {
        console.error(e);
    }
}

module.exports = {
    ClearCartAction
};