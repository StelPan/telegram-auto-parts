const Emoji = require("node-emoji")
const { Markup } = require("telegraf")

const StartKeyboard = Markup.keyboard([
    [
        "Каталог " + Emoji.get("blue_book"),
        "Корзина " + Emoji.get("shopping_trolley"),
    ],
    [
        "Поиск " + Emoji.get("mag"),
        "Заказы " + Emoji.get("scroll")
    ],
    [
        "Контакты " + Emoji.get("iphone"),
        "FAQ " + Emoji.get("question")
    ],
    [ "Настройки " + Emoji.get("gear") ],
])

module.exports = { StartKeyboard }