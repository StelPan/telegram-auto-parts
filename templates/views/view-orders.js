function ViewOrders (orders) {
    let message =
        `Показано последние 10 заказов. \r\n` +
        `<b>Список ваших заказов:</b> \r\n \r\n` +
        (!orders.length ? "Вы еще не сделали ни одного заказа." : "");

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

    return message;
}

module.exports = ViewOrders;