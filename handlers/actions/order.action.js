const { Markup } = require("telegraf");
const path = require("path");
const { order, product, status } = require(path.resolve("models"));

async function ShowOrderAction (ctx) {
    const [_, id] = ctx.update.callback_query.data.split(":");

    const findOrder = await order.findByPk(id, {
        include: [{ model: product }, { model: status }]
    });

    let message = `Заказ №${findOrder.id} \r\n` +
        `Итоговая стоимость: ${findOrder.total_cash} руб. \r\n` +
        `Количество товаров: ${findOrder.products.length} \r\n` +
        `Статус: ${findOrder.status.name} \r\n` +
        `------------------------------ \r\n` +
        `Состав заказа: \r\n`;

    for (let product of findOrder.products) {

        message += `№Товара: ${product.id} \r\n` +
            `Название: ${product.name} \r\n` +
            `Цена: ${product.price} \r\n` +
            `------------------------------ \r\n`;
    }

    await ctx.editMessageText(message);
}

module.exports = {
    ShowOrderAction
};