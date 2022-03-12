const { user } = require("../../models")

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
            })

            const message = `Привет, ${info.first_name}! \r\n` +
                `Рады видеть тебя в нашем магазин. \r\n` +
                `Большой ассортимент и удобный поиск доступны для тебя здесь. \r\n` +
                `Желем удачных покупок`;

            await ctx.reply(message)
        }

        next();
    } catch (error) {
        console.error(error)
    }
}

module.exports = NewUserMiddleware;