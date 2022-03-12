const { Markup } = require("telegraf")

const keyboard = (productId, count, page, limit) => {
    const nav = [
        Markup.button.callback("Назад", `CART_EDIT_PAGE:${page - 1}`),
        Markup.button.callback("Удалить товар", `CART_DELETE_PRODUCT:${productId}`),
    ]

    if (page * limit < count) {
        nav.push(Markup.button.callback("Вперед", `CART_EDIT_PAGE:${page + 1}`))
    }


    return Markup.inlineKeyboard([ nav, [Markup.button.callback("Обратно", "CART_EDIT_BACK")] ])
}

module.exports = {keyboard};