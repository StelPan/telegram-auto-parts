const { cart, product } = require("../../models");
const { keyboard } = require("../../keyboards/cart.keyboard");
const { keyboard: editCartKeyboard } = require("../../keyboards/edit-cart.keyboard");

async function ShowCartAction (ctx) {
    let userCart = await cart.findOrCreate({
        where: { user_id: ctx?.from?.id || ctx?.update?.callback_query?.from?.id },
        include: [{
            model: product
        }]
    });

    userCart = userCart[0];

    const cartProducts = await userCart.getProducts();

    let message = `Ваша корзина: \r\n`;

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

async function ClearCartAction (ctx) {
    try {
        await ctx.answerCbQuery();
        await ctx.deleteMessage();

        const userCart = await cart.findOne({
            where: { user_id: ctx.from.id },
            include: [{
                model: product
            }]
        })

        const userProducts = await userCart.getProducts()

        for (let product of userProducts) {
            await userCart.removeProduct(product);
        }

        await ctx.reply("Ваша корзина пуста...")
    } catch (e) {
        console.error(e);
    }
}

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
    ShowCartAction,
    EditCartAction,
    ClearCartAction,
    DeleteProductAction
};