const { Composer } = require("telegraf");
const {
    CONTACTS_TYPE,
    CATALOG_TYPE,
    ORDERS_TYPE,
    CART_TYPE,
    FAQ_TYPE,
    PROFILE_TYPE,
    getNameButton
} = require("../../keyboards/keyboard-keys");

const { ContactsAction }    = require("../behaviors/contacts.action");
const { FaqAction }         = require("../behaviors/faq.action");
const { CatalogAction }     = require("../behaviors/catalog/view-categories");
const { ShowCartAction }    = require("../behaviors/cart/show-cart");
const ShowOrders            = require("../behaviors/order/show-orders");

const HearsComposer = new Composer();

HearsComposer.hears(
    getNameButton(CONTACTS_TYPE),
    ContactsAction
);

HearsComposer.hears(
    getNameButton(FAQ_TYPE),
    FaqAction
);

HearsComposer.hears(
    getNameButton(CATALOG_TYPE),
    CatalogAction
);

HearsComposer.hears(
    getNameButton(CART_TYPE),
    ShowCartAction
);

HearsComposer.hears(
    getNameButton(ORDERS_TYPE),
    ShowOrders
);

module.exports = { HearsComposer };