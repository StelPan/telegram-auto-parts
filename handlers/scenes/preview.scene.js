const { Scenes: { BaseScene } } = require("telegraf")
const { StartKeyboard } = require("../../keyboards/start.keyboard")

const PreviewScene = new BaseScene("PreviewScene")

const Preview = async (ctx) => {
    try {
        await ctx.reply("Выберите пункт меню:", StartKeyboard)
    } catch (error) {
        console.error(error)
    }
}

PreviewScene.enter(Preview)

module.exports = PreviewScene