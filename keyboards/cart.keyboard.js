const { Markup } = require("telegraf")
const emoji = require("node-emoji")

const keyboard = () => {
    return Markup.inlineKeyboard([
        [
            Markup.button.callback("Изменить " + emoji.get("open_book"), "CART_EDIT_PAGE:1"),
            Markup.button.callback("Очистить " + emoji.get("negative_squared_cross_mark"), "CLEAR_CART"),
            Markup.button.callback("Избранные " + emoji.get("heart"), "SHOW_FAVORITES:1")
        ],
        [
            Markup.button.callback("Оформить заказ " + emoji.get("heavy_check_mark"), "ORDER_COMPLETE")
        ]
    ])
}

module.exports = {
    keyboard,
}