const { cart, product } = require("../../../models");
const { keyboard } = require("../../../keyboards/cart.keyboard");
const { keyboard: editCartKeyboard } = require("../../../keyboards/edit-cart.keyboard");

async function EditCartAction (ctx) {
    try {
        const page = +ctx.update.callback_query.data.split(":")[1];

        let userCart = await cart.findOrCreate({
            where: { user_id: ctx.update.callback_query.from.id },
            include: [{
                model: product
            }]
        });

        userCart = userCart[0];

        const productsRequest = userCart.getProducts({ limit: 1, offset: page ? page - 1 : page, });
        const countRequest = userCart.countProducts();
        const [ products, count ] = await Promise.all([
            productsRequest,
            countRequest
        ]);

        if (!count) {
            await ctx.answerCbQuery("Корзина пуста.");
            return;
        }

        const cartProduct = products[0];
        const keyboard = editCartKeyboard(cartProduct.id, count, page, 1);

        const message = `Артикул товара: ${cartProduct.id} \r\n`
            + `Название: ${cartProduct.name} \r\n`
            + `Цена товара: ${cartProduct.price} \r\n`
            + `Описание: ${cartProduct.description} \r\n`;

        await ctx.editMessageText(message, keyboard);
    } catch (err) {
        console.error(err)
    }
}

module.exports = {
    EditCartAction
}