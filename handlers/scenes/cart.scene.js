const { Scenes: { BaseScene } } = require("telegraf")
const { cart, product, user, favorite } = require("../../models")
const { keyboard } = require("../../keyboards/cart.keyboard")
const favoriteKeyboard = require("../../keyboards/favorite.inline")
const { keyboard: editCartKeyboard } = require("../../keyboards/edit-cart.keyboard")

const CartScene = new BaseScene("CartScene")

CartScene.enter(async (ctx) => {
    const userCart = await cart.findOne({
        where: { user_id: ctx.from.id },
        include: [{
            model: product
        }]
    })

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
    await ctx.replyWithHTML(message, cartKeyboard)
});

CartScene.action(/CART_EDIT_PAGE:[0-9]+/, async (ctx) => {
    try {
        await ctx.answerCbQuery();

        const page = +ctx.update.callback_query.data.split(":")[1]
        if (!page) {
            return;
        }

        const userCart = await cart.findOne({
            where: { user_id: ctx.update.callback_query.from.id },
            include: [{
                model: product
            }]
        })

        const productsRequest = userCart.getProducts({ limit: 1, offset: page - 1, });
        const countRequest = userCart.getProducts();
        const [ products, count ] = await Promise.all([
            productsRequest,
            countRequest
        ])

        const cartProduct = products[0]
        const keyboard = editCartKeyboard(cartProduct.id, count.length, page, 1);

        const message = `Артикул товара: ${cartProduct.id} \r\n`
            + `Название: ${cartProduct.name} \r\n`
            + `Цена товара: ${cartProduct.price} \r\n`
            + `Описание: ${cartProduct.description} \r\n`

        await ctx.editMessageText(message, keyboard);
    } catch (err) {
        console.error(err)
    }
})

CartScene.action(/CART_DELETE_PRODUCT:[0-9]+/, async (ctx) => {
    try {
        const productId = +ctx.update.callback_query.data.split(":")[1]

        const findProduct = await product.findByPk(productId)

        const userCart = await cart.findOne({
            where: { user_id: ctx.update.callback_query.from.id },
            include: [{
                model: product
            }]
        })

        await userCart.removeProduct(findProduct);

        await ctx.deleteMessage();
        await ctx.scene.reenter();
    } catch (err) {
        console.error(err)
    }
})

CartScene.action(/CART_EDIT_BACK/, async (ctx) => {
    try {
        await ctx.answerCbQuery();
        await ctx.deleteMessage();
        await ctx.scene.enter("CartScene");
    } catch(err) {
        console.error(err)
    }
})

CartScene.action(/CLEAR_CART/, async (ctx) => {
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
    await ctx.scene.enter("PreviewScene")
})

CartScene.action(/SHOW_FAVORITES:[0-9]+/, async (ctx) => {
    try {
        const {
            data,
            from: { id }
        } = ctx.update.callback_query;

        const page = data
            .split(":")
            .pop();

        console.log("PAGE", page);

        const [favorites, created] = await favorite
            .findOrCreate({ where: { user_id: id }});

        const products = await favorites.getProducts({ limit: 1, offset: page - 1 });

        const product = products[0];
        const count = (await favorites.getProducts()).length;

        const message =
            `Название: ${product.get("name")} \r\n` +
            `Цена: ${product.get("price") + "руб."} \r\n` +
            `Описание: ${product.get("description")} \r\n`;

        const keyboard = favoriteKeyboard(product.id, +page, count);

        await ctx.editMessageText(message, keyboard);
    } catch (e) {
        console.error(e);
    }
})

CartScene.action(/ORDER_COMPLETE/, async (ctx) => {

})

module.exports = CartScene