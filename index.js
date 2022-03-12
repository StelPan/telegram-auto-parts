const path = require("path")
const dotenv = require("dotenv")
const server = require("./http/server")

dotenv.config({
    path: path.resolve("./", ".env")
})

const {
    bot,
    webhookPath
} = require("./plugins/telegraf")

async function start () {
    await bot.launch()

    await server(function (app) {
        app.use(bot.webhookCallback(webhookPath))
    })
}

start();