const { Markup } = require("telegraf")
const Emoji = require("node-emoji")

const CATALOG_TYPE = "CATALOG_TYPE"
const CART_TYPE = "CART_TYPE"
const SEARCH_TYPE = "SEARCH_TYPE"
const ORDERS_TYPE = "ORDERS_TYPE"
const CONTACTS_TYPE = "CONTACTS_TYPE"
const FAQ_TYPE = "FAQ_TYPE"
const SETTINGS_TYPE = "SETTINGS_TYPE"

const KEYS = {
    [CATALOG_TYPE]: "Каталог " + Emoji.get("blue_book"),
    [CART_TYPE]: "Корзина " + Emoji.get("shopping_trolley"),
    [SEARCH_TYPE]: "Поиск " + Emoji.get("mag"),
    [ORDERS_TYPE]: "Заказы " + Emoji.get("scroll"),
    [CONTACTS_TYPE]: "Контакты " + Emoji.get("iphone"),
    [FAQ_TYPE]: "FAQ " + Emoji.get("question"),
    [SETTINGS_TYPE]: "Настройки " + Emoji.get("gear")
}

const keyboard = Markup.keyboard([
    [
        KEYS[CATALOG_TYPE],
        KEYS[CART_TYPE]
    ],
    [
        KEYS[SEARCH_TYPE],
        KEYS[ORDERS_TYPE]
    ],
    [
        KEYS[CONTACTS_TYPE],
        KEYS[FAQ_TYPE]
    ],
    [
        KEYS[SETTINGS_TYPE]
    ]
])

module.exports = {
    keyboard,
    keys: KEYS,
}