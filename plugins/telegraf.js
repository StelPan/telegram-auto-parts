const { Telegraf, session } = require("telegraf")
const stages                = require("../handlers/stages")
const middlewares           = require("../handlers/middlewares")

const {
    TELEGRAM_API_TOKEN,
    TELEGRAM_WEBHOOK_URL
} = process.env

const bot = new Telegraf(TELEGRAM_API_TOKEN)


bot.use(
    middlewares,
    session(),
    stages,
)


bot.start(async (ctx) => {
    await ctx.scene.enter("PreviewScene");
})

const webhookPath = TELEGRAM_WEBHOOK_URL + `/telegraf/${bot.secretPathComponent()}`

bot
    .telegram
    .setWebhook(webhookPath)
    .then(() => console.log("Webhook url set successfully"))
    .catch((e) => console.error(e))

module.exports = {
    bot,
    webhookPath
}