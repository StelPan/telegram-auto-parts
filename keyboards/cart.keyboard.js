const { Markup } = require("telegraf")
const Emoji = require("node-emoji")

const keyboard = () => {
    return Markup.inlineKeyboard([
        [
            Markup.button.callback("Редактировать", "CART_EDIT_PAGE:1"),
            Markup.button.callback("Очистить", "CLEAR_CART"),
            Markup.button.callback("Избранные", "SHOW_FAVORITES:1")
        ],
        [
            Markup.button.callback("Оформить заказ", "ORDER_COMPLETE")
        ]
    ])
}

module.exports = {
    keyboard,
}