const path = require("path");
const { Composer } = require("telegraf");
const { cart, product, favorite } = require("../../models");
const { cartAction } = require("../actions/cart.action");
const favoriteKeyboard = require("../../keyboards/favorite.inline");
const { keyboard: editCartKeyboard } = require("../../keyboards/edit-cart.keyboard");
const { editProductKeyboard } = require("../../keyboards/product.inline");
const { keys } = require("../../keyboards/start.keyboard");
const { startHandler } = require("../actions/start.action");

const composer = new Composer();

composer.hears(keys.CART_TYPE, async (ctx) => {
    const { message, cartKeyboard } = await cartAction(ctx);
    await ctx.replyWithHTML(message, cartKeyboard);
});

composer.action(/^CART_EDIT_PAGE:[0-9]+$/, async (ctx) => {
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
})

composer.action(/^CART_DELETE_PRODUCT:[0-9]+$/, async (ctx) => {
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

        const { message, cartKeyboard } = await startHandler(ctx);

        await ctx.editMessageText(message, {
            parse_mode: "HTML",
            ...cartKeyboard
        });
    } catch (err) {
        console.error(err)
    }
})

composer.action(/^CART_EDIT_BACK$/, async (ctx) => {
    try {
        const { message, cartKeyboard } = await startHandler(ctx);

        // TODO: FIXED
        await ctx.deleteMessage();
        await ctx.replyWithHTML(message, cartKeyboard);
    } catch(err) {
        console.error(err)
    }
})

composer.action(/CLEAR_CART/, async (ctx) => {
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
})

composer.action(/^SHOW_FAVORITES:[0-9]+$/, async (ctx) => {
    try {
        const {
            data,
            from: { id }
        } = ctx.update.callback_query;

        const page = data
            .split(":")
            .pop();

        const [favorites, ] = await favorite.findOrCreate({where: {user_id: id}});
        const [carts, ]     = await cart.findOrCreate({where: {user_id: id}})

        const products = await favorites.getProducts({
            limit: 1,
            offset: page - 1,
            scope: [{ method: ["full", {favorite_id: favorites.id, cart_id: carts.id}]}]
        });

        const count = await favorites.countProducts();
        if (!count) {
            await ctx.answerCbQuery("Избранные товары отсутствуют.");
            return;
        }

        const product = products[0];

        const message =
            `Название: ${product.get("name")} \r\n` +
            `Цена: ${product.get("price") + "руб."} \r\n` +
            `Описание: ${product.get("description")} \r\n`;

        const keyboard = favoriteKeyboard(product.id, +page, count);

        if (product.get("carts").length) {
            keyboard.reply_markup.inline_keyboard[0][0].text = "В корзине"
        } else {
            keyboard.reply_markup.inline_keyboard[0][0].text = "В корзину"
        }

        const sourceHttp = process.env.TELEGRAM_WEBHOOK_URL + `/images/${product.get("images")[0].source}`

        let source = product.get("images")[0]?.source ? path.resolve(
            "storage",
            "images",
            product.get("images")[0]?.source
        ) : null;

        if (!source) {
            return ctx.answerCbQuery("Отсутвует фотография товара");
        }

        const isSendingPhoto = ctx
            .update
            .callback_query
            .message
            ?.photo
            ?.length;

        const method = !isSendingPhoto ?
            "replyWithPhoto" :
            "editMessageMedia";

        !isSendingPhoto ?
            await ctx.deleteMessage() :
            "";

        const params = !isSendingPhoto ?
            [{ source }, {
                caption: message,
                parse_mode: "Markdown",
                ...keyboard
            }] : [{ media: sourceHttp, type: "photo", caption: message, }, {
                parse_mode: "Markdown",
                ...keyboard
            }];

        await ctx.answerCbQuery();
        await ctx[method](...params);
    } catch (e) {
        console.error(e);
    }
})

composer.action(/^DELETE_FAVORITE_PRODUCT:[0-9]+$/, async (ctx) => {
    try {
        const {
            data,
            from: { id }
        } = ctx.update.callback_query;

        const [ , productId] = data.split(":");

        const [findFavorite, ] = await favorite.findOrCreate({ where: {user_id: id}})
        await findFavorite.removeProduct(productId);

        const { message, cartKeyboard } = await startHandler(ctx);

        await ctx.deleteMessage();
        await ctx.reply(message, cartKeyboard);
    } catch (e) {
        console.log(e);
    }
})

composer.action(/ADD_CART_PRODUCT_FROM_FAVORITE:[0-9]+/, async (ctx) => {
    try {
        const { callback_query } = ctx.update;

        const {
            data,
            message: { reply_markup, caption },
            from: { id }
        } = callback_query;

        const [_, productId] = data.split(":");

        const [userCart, ] = await cart.findOrCreate({where: {user_id: id}});

        const editKeyboard = editProductKeyboard(reply_markup.inline_keyboard);

        const exist = await userCart.getProducts({ where: { id: productId }});

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
});

composer.action(/ORDER_COMPLETE/, async (ctx) => {
    await Promise.all([
        ctx.scene.enter("CompleteOrder"),
    ]);
})

module.exports = composer;