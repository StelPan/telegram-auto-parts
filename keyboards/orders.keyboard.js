const { Markup } = require("telegraf");

const ChunkedArray = (arr, chunkValue) => {
    let chunkedArray = []

    for (let i = 0; i <= arr.length; i += chunkValue) {
        const chunk = arr.slice(i, i + chunkValue);
        chunkedArray.push(chunk)
    }

    return chunkedArray
}

function orderKeyboards(orders) {
    let keyboard = [];

    const chunks = ChunkedArray(orders, 2);
    for (let chunk of chunks) {
        let inline = [];

        for (let order of chunk) {
            inline.push(Markup.button.callback(`Заказ #${order.id}`, `ORDER:${order.id}`));
        }

        keyboard.push(inline);
    }


    return Markup.inlineKeyboard(keyboard);
}

module.exports = orderKeyboards;