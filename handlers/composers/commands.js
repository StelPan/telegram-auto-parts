const { Composer }          = require("telegraf");
const { startAction }       = require("../behaviors/start.action");
const { FaqAction }         = require("../behaviors/faq.action");
const { ShowCartAction }    = require("../behaviors/cart/show-cart");
const { CatalogAction }     = require("../behaviors/catalog/view-categories");
const ShowOrders            = require("../behaviors/order/show-orders");


const composer = new Composer();

// Перезапуск бота
composer.command("start", startAction);

// Команда отображения товаров в корзине
composer.command("cart", ShowCartAction);

// Команда отображения справочной информации
composer.command("faq", FaqAction);

composer.command("orders", ShowOrders);

//
composer.command("catalog", CatalogAction);

module.exports = {
    CommandsComposer: composer
};