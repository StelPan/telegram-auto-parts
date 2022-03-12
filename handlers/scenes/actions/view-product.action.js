const path = require("path");
const { category, cart, cart_product, image, favorite, favorite_product }  = require("../../../models");
const productKeyboard = require("../../../keyboards/product.inline");

const switchMethodCtx = async (ctx, method, params) => {
    return await ctx[method](...params)
}

const ViewProduct = async (ctx) => {
    try {
        await ctx.answerCbQuery();

        const fullMask = /^CATEGORY:[0-9]+;PAGE_PRODUCT:[0-9]+$/
        const categoryMask = /^CATEGORY:[0-9]+$/

        const callbackData = ctx
            .update
            .callback_query
            .data

        const id = ctx
            .update
            .callback_query
            .from
            .id

        let
            productPage = 0,
            categoryId = 0

        if (fullMask.test(callbackData)) {
            const slice = callbackData.split(";");
            productPage = +slice[1].split(":")[1];
            categoryId = +slice[0].split(":")[1];
            productPage = !productPage ? 1 : productPage;
        } else if (categoryMask.test(callbackData)) {
            categoryId = +callbackData.split(":")[1];
            productPage = 1;
        }

        const findCategory      = await category.findByPk(+categoryId)

        const findCart          = await cart.findOne({ where: { user_id: id }})

        const findProduct       = await findCategory.getProducts({
            limit: 1,
            offset: productPage,
            include: [{
                model: cart,
                through: {
                    model: cart_product,
                    where: { cart_id: findCart.id }
                },
            }, { model: image }]
        });

        const product = findProduct[0]

        const message =
            `Название: ${product.get("name")} \r\n` +
            `Цена: ${product.get("price") + "руб."} \r\n` +
            `Описание: ${product.get("description")} \r\n`

        const keyboard = productKeyboard.createKeyboard(
            product.id,
            !!product.get("carts").length,
            productPage,
            categoryId
        )

        const source = path.resolve(
            "storage",
            "images",
            product.get("images")[0].source
        )

        const sourceHttp = process.env.TELEGRAM_WEBHOOK_URL + `/images/${product.get("images")[0].source}`

        const method = !ctx.session?.isSendPhoto ?
            "replyWithPhoto" :
            "editMessageMedia";

        !ctx.session?.isSendPhoto ?
            await ctx.deleteMessage() :
            ""

        const params = !ctx.session?.isSendPhoto ?
            [{ source }, {
                caption: message,
                parse_mode: "Markdown",
                ...keyboard
            }] : [{ media: sourceHttp, type: "photo", caption: message, }, {
                parse_mode: "Markdown",
                ...keyboard
            }];

        await switchMethodCtx(ctx, method, params)

        !ctx.session?.isSendPhoto ?
            ctx.session.isSendPhoto = true :
            null
    } catch (e) {
        console.error(e)
    }
}

module.exports = ViewProduct;