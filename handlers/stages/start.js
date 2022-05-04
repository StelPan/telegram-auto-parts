const { Composer } = require("telegraf");
const { keys } = require("../../keyboards/start.keyboard");

const { ContactsAction }    = require("../actions/contacts.action");
const { FaqAction }         = require("../actions/faq.action");
const { startAction }       = require("../actions/start.action");

const composer = new Composer();

composer.start(startAction);

// Контактная информация
composer.hears(keys.CONTACTS_TYPE, ContactsAction);

// Справочная информация
composer.hears(keys.FAQ_TYPE, FaqAction);

module.exports = composer;
