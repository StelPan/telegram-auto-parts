const {cart, product} = require("../../models");
const {keyboard} = require("../../keyboards/cart.keyboard");

const startHandler = async (ctx) => {
    let userCart = await cart.findOrCreate({
        where: { user_id: ctx.from.id },
        include: [{
            model: product
        }]
    });

    userCart = userCart[0];

    const cartProducts = await userCart.getProducts()

    let message = `Ваша корзина: \r\n`

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

    return { cartKeyboard, message };
};

module.exports = { cartAction: startHandler };