const { Composer } = require("telegraf");
const { keys } = require("../../keyboards/start.keyboard");
const { startAction } = require("../actions/start.action");

const composer = new Composer();

composer.start(startAction);

composer.hears(keys.CONTACTS_TYPE, async (ctx) => {
    try {
        const message =
            "<b>Обратная связь</b> \r\n" +
            "Почтовый адрес: autopartssupport@gmail.com. \r\n" +
            "Телефон: +7-3842-32-34-23";

        await ctx.replyWithHTML(message);
    } catch (e) {
        console.error(e);
    }
})

composer.hears(keys.FAQ_TYPE, async (ctx) => {
    const message =
        `- Добавляйте товары, нажав на кнопку "В корзину" \r\n` +
        `- Добавляйте товары в "Избранные" нажав на кнопку добавить "в избранное" \r\n`
    await ctx.reply(message);
});

module.exports = composer;
