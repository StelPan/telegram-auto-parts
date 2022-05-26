const emoji = require("node-emoji");
const { user, cart, favorite } = require("../../models");

const { APP_NAME } = process.env;

const NewUserMiddleware = async (ctx, next) => {
    try {
        const
            id = ctx.from?.id,
            info = ctx.from

        if (!id) {
            return;
        }

        const [client, created] = await user.findOrCreate({
            where: { id }
        });

        if (created) {
            // Update user after create
            await client.update({ information: info, balance: 0 });

            await ctx.reply(
                `Привет, ${info.first_name}! ${emoji.get("smiley")} \r\n` +
                `Рады видеть тебя в нашем магазине "${ APP_NAME }" ${emoji.get("doughnut")} \r\n` +
                `Большой ассортимент различных аксессуаров для вашего автомобиля у нас!. \r\n` +
                `Желем удачных покупок!`
            );
        }

        await cart.findOrCreate({ where: { user_id: client.id } });
        await favorite.findOrCreate({ where: { user_id: client.id }});

        next();
    } catch (error) {
        console.error(error);
    }
}

module.exports = NewUserMiddleware;