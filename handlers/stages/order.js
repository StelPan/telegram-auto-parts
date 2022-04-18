const { Composer } = require("telegraf");
const { user, product, status } = require("../../models");
const { keys } = require("../../keyboards/start.keyboard");
const composer = new Composer();

composer.hears(keys.ORDERS_TYPE, async (ctx) => {
    try {
        const clientCollect = await user.findByPk(ctx.from.id);

        const orders = await clientCollect.getOrders({
            include: [
                { model: product },
                { model: status },
            ],
            order: [["id", "desc"]]
        });

        let message =
            `Показано последние 10 заказов. \r\n` +
            `<b>Список ваших заказов:</b> \r\n \r\n`;

        for (let order of orders) {
            const products = order.get("products");

            message +=
                `<b>Номер заказа</b>: ${order.id}. \r\n` +
                `Статус заказа: ${order.status.name}. \r\n` +
                `Итоговая сумма заказ: ${order.total_cash}. \r\n` +
                `Скидочный купон: Отсутвует. \r\n` +
                `Дата заказа: ${order.createdAt} \r\n` +
                `--------------------- \r\n`;
        }

        await ctx.replyWithHTML(message);
    } catch (e) {
        console.error(e);
    }
});

module.exports = composer;