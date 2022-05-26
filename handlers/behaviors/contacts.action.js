const emoji = require("node-emoji");

async function ContactsAction (ctx) {
    try {
        await ctx.replyWithHTML(
            `<b>Обратная связь ${emoji.get("telephone_receiver")}</b> \r\n\r\n` +
            "Почтовый адрес: autopartssupport@gmail.com. \r\n" +
            "Телефон: +7-3842-32-34-23"
        );
    } catch (e) {
        console.error(e);
    }
}

module.exports = {
    ContactsAction
};