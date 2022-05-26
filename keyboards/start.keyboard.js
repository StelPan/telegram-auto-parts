const { Markup } = require("telegraf")
const {
    CATALOG_TYPE,
    CART_TYPE,
    PROFILE_TYPE,
    ORDERS_TYPE,
    CONTACTS_TYPE,
    FAQ_TYPE,
    getNameButton
} = require("./keyboard-keys");

const keyboard = Markup.keyboard([
    [
        getNameButton(CATALOG_TYPE),
        getNameButton(CART_TYPE),
        getNameButton(ORDERS_TYPE)
    ],
    [
        getNameButton(CONTACTS_TYPE),
        getNameButton(FAQ_TYPE)
    ]
]);

module.exports = {
    keyboard,
}