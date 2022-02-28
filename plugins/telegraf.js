const { Telegraf, session } = require("telegraf")
const stages = require("../handlers/stages")

const { TELEGRAM_API_TOKEN } = process.env

const bot = new Telegraf(TELEGRAM_API_TOKEN)

bot.use(
    session(),
    stages,
)

module.exports = bot