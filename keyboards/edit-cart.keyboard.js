const { Markup } = require("telegraf");
const emoji = require("node-emoji");

const keyboard = (productId, count, page, limit) => {
    const nav = [
        Markup.button.callback(emoji.get("arrow_left") + " Назад", `CART_EDIT_PAGE:${page - 1}`),
        Markup.button.callback("Удалить товар " + emoji.get("negative_squared_cross_mark"), `CART_DELETE_PRODUCT:${productId}`),
    ]

    if (page * limit < count) {
        nav.push(Markup.button.callback("Вперед " + emoji.get("arrow_right"), `CART_EDIT_PAGE:${page + 1}`))
    }


    return Markup.inlineKeyboard([ nav, [Markup.button.callback("Обратно", "CART_EDIT_BACK")] ])
}

module.exports = {keyboard};