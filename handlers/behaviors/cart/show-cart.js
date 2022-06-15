const { cart, product } = require("../../../models");
const { keyboard } = require("../../../keyboards/cart.keyboard");
const { keyboard: editCartKeyboard } = require("../../../keyboards/edit-cart.keyboard");

async function ShowCartAction (ctx) {
    let userCart = await cart.findOrCreate({
        where: { user_id: ctx?.from?.id || ctx?.update?.callback_query?.from?.id },
        include: [{
            model: product
        }]
    });

    userCart = userCart[0];

    const cartProducts = await userCart.getProducts();

    let message = `Нажимая кнопку "Оформить заказ" вы соглашаетесь на обработку персональных данных, собираемых во время оформления заказа.  \r\n\r\n`;

    message += `Ваша корзина: \r\n`;

    if (cartProducts.length) {
        let totalSum = 0;

        for (let product of cartProducts) {
            message += `#${product.id} \r\n`
            message += `Название: ${product.name} \r\n`
            message += `Цена: ${product.price}руб. \r\n`
            message += `------ \r\n`
            totalSum += product.price;
        }

        message += `Итого: ${totalSum}руб.`
    } else {
        message += "<b>Козина пуста.</b>";
    }

    const cartKeyboard = keyboard();

    await ctx.replyWithHTML(message, cartKeyboard);
}

module.exports = {
    ShowCartAction
};