const { Composer } = require("telegraf");
const { keys } = require("../../keyboards/start.keyboard");

const composer = new Composer();

composer.hears(keys.SEARCH_TYPE, async (ctx) => {
   ctx.reply("Введите название товара или часть названия: ", {
      reply_markup: { remove_keyboard: true }
   });
});

module.exports = composer;