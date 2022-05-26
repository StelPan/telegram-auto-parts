const { Telegraf, session } = require("telegraf")
const stages                = require("../handlers/stages")
const middlewares           = require("../handlers/middlewares")

const {
    TELEGRAM_API_TOKEN,
    TELEGRAM_WEBHOOK_URL
} = process.env

const bot = new Telegraf(TELEGRAM_API_TOKEN)

const { HearsComposer } = require("../handlers/composers/hears");
const { CommandsComposer } = require("../handlers/composers/commands");
const { ActionsComposer } = require("../handlers/composers/actions");

bot.use(
    middlewares,
    session(),
    stages,
    HearsComposer,
    CommandsComposer,
    ActionsComposer,
    require("../handlers/stages/order"),
)

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