require("dotenv").config({ path: "./.env" })

const telegraf = require("./plugins/telegraf")

telegraf.start(async (ctx) => {
    await ctx.scene.enter("PreviewScene");
})

telegraf
    .launch()
    .then(() => console.log("start"))