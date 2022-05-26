const Emoji = require("node-emoji")

const CATALOG_TYPE  = "CATALOG_TYPE"
const CART_TYPE     = "CART_TYPE"
const SEARCH_TYPE   = "SEARCH_TYPE"
const ORDERS_TYPE   = "ORDERS_TYPE"
const CONTACTS_TYPE = "CONTACTS_TYPE"
const FAQ_TYPE      = "FAQ_TYPE"
const SETTINGS_TYPE = "SETTINGS_TYPE"
const PROFILE_TYPE  = "PROFILE_TYPE"

const nameButton = {
    [CATALOG_TYPE]: "Каталог " + Emoji.get("blue_book"),
    [CART_TYPE]: "Корзина " + Emoji.get("shopping_trolley"),
    [PROFILE_TYPE]: "Профиль " + Emoji.get("man"),
    [ORDERS_TYPE]: "Заказы " + Emoji.get("scroll"),
    [CONTACTS_TYPE]: "Контакты " + Emoji.get("iphone"),
    [FAQ_TYPE]: "FAQ " + Emoji.get("question"),
    [SETTINGS_TYPE]: "Настройки " + Emoji.get("gear")
}

function getNameButton (key) {
    return nameButton[key] || undefined
}

module.exports = {
    CATALOG_TYPE,
    CART_TYPE,
    PROFILE_TYPE,
    ORDERS_TYPE,
    CONTACTS_TYPE,
    FAQ_TYPE,
    SETTINGS_TYPE,
    getNameButton
};