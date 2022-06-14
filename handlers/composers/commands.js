const { Composer }          = require("telegraf");
const { startAction }       = require("../behaviors/start.action");
const { FaqAction }         = require("../behaviors/faq.action");
const { ShowCartAction }    = require("../behaviors/cart/show-cart");
const { CatalogAction }     = require("../behaviors/catalog/view-categories");
const { ContactsAction }    = require("../behaviors/contacts.action");
const ShowOrders            = require("../behaviors/order/show-orders");

const composer = new Composer();

// Перезапуск бота
composer.command("start", startAction);

// Команда отображения товаров в корзине
composer.command("cart", ShowCartAction);

// Команда для быстрого открытия ранее выполненых заказов
composer.command("orders", ShowOrders);

// Команда для быстрого открытия каталога
composer.command("catalog", CatalogAction);

// Команда отображения справочной информации
composer.command("faq", FaqAction);

// Команда для отображения контактной информации
composer.command("contacts", ContactsAction);

module.exports = {
    CommandsComposer: composer
};