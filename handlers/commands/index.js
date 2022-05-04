const { Composer } = require("telegraf");
const { FaqAction } = require("../actions/faq.action");
const { ShowCartAction } = require("../actions/cart.action");

const composer = new Composer();

// composer.command("/catalog", async (ctx) => )

// Команда отображения товаров в корзине
composer.command("/cart", ShowCartAction);

// Команда отображения справочной информации
composer.command("/faq", FaqAction);

// composer.command("/orders", async (ctx) => )

// composer.command("/contacts", async (ctx) => )

// composer.command("/search", async (ctx) => )

module.exports = composer;