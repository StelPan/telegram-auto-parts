const Emoji = require("node-emoji");

function DateToStringRu(date) {
    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
}

function ViewOrders (orders) {
    let message =
        `Показано последние 10 заказов ${Emoji.get("ledger")}  \r\n\r\n` +
        `<b>Список ваших заказов:</b> \r\n \r\n` +
        (!orders.length ? "Вы еще не сделали ни одного заказа." : "");

    for (let order of orders) {
        const products = order.get("products");

        message +=
            `<b>Номер заказа</b>: ${order.id} ${Emoji.get("hash")} \r\n` +
            `Статус заказа: ${order.status.name} ${Emoji.get("information_source")} \r\n` +
            `Итоговая сумма заказ: ${order.total_cash} руб. \r\n` +
            `Дата заказа: ${DateToStringRu(order.createdAt)} ${Emoji.get("date")} \r\n` +
            `--------------------- \r\n`;
    }

    return message;
}

module.exports = ViewOrders;