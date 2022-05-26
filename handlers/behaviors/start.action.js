const { keyboard } = require("../../keyboards/start.keyboard");

const startAction = async function (ctx) {
    try {
        await ctx.reply("Выберите пункт меню:", keyboard);
    } catch (error) {
        console.error(error)
    }
};

module.exports = { startAction };