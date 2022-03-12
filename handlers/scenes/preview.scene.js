const { Scenes: { BaseScene } } = require("telegraf")
const { keyboard, keys }         = require("../../keyboards/start.keyboard")

const PreviewScene = new BaseScene("PreviewScene")

const Preview = async (ctx) => {
    try {
        await ctx.reply("Выберите пункт меню:", keyboard)
    } catch (error) {
        console.error(error)
    }
}

PreviewScene.hears(keys.CATALOG_TYPE, async (ctx) => {
    await ctx.scene.enter("CatalogScene");
})

PreviewScene.hears(keys.CART_TYPE, async (ctx) => {
    await ctx.scene.enter("CartScene");
})

PreviewScene.hears(keys.FAQ_TYPE, async (ctx) => {
    const message = `- Добавляйте товары, нажав на кнопку "В корзину" \r\n` +
        `- Добавляйте товары в "Избранные" нажав на кнопку добавить "в избранное" \r\n`

    await ctx.reply(message)
})


PreviewScene.enter(Preview)

module.exports = PreviewScene