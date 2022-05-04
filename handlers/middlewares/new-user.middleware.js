const emoji = require("node-emoji");
const { user, cart, favorite } = require("../../models");

const NewUserMiddleware = async (ctx, next) => {
    try {
        const
            id = ctx.from?.id,
            info = ctx.from

        if (!id) {
            return;
        }

        const existUser = await user.findByPk(id);

        if (!existUser) {
            await user.create({
                id: id,
                information: info,
                balance: 0,
            });

            await ctx.reply(
                `Привет, ${info.first_name}! ${emoji.get("smiley")} \r\n` +
                `Рады видеть тебя в нашем магазине "Глазурь" ${emoji.get("doughnut")} \r\n` +
                `Большой ассортимент кондитерских товаров и удобный поиск доступны для тебя здесь. \r\n` +
                `Желем удачных покупок!`
            );
        }

        await cart.findOrCreate({ where: { user_id: existUser.id } });
        await favorite.findOrCreate({ where: { user_id: existUser.id }});

        next();
    } catch (error) {
        console.error(error);
    }
}

module.exports = NewUserMiddleware;