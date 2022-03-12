const { Markup } = require("telegraf")

const CHUCK_ARRAY = 4

const ChunkedArray = (arr, chunkValue) => {
    let chunkedArray = []

    for (let i = 0; i <= arr.length; i += chunkValue) {
        const chunk = arr.slice(i, i + chunkValue);
        chunkedArray.push(chunk)
    }

    return chunkedArray
}

const InlineKeyboard = (categories, count, page = 1, limit) => {
    let chunkCategories = ChunkedArray(categories, 2)

    const keyboard = []

    chunkCategories.forEach(categories => {
        let inline = []

        for (let category of categories) {
            inline.push(Markup.button.callback(category.name, `CATEGORY:${category.id}`))
        }

        keyboard.push(inline)
    })

    let nav = [
        Markup.button.callback("Назад", `PAGE:${page - 1}`),
        Markup.button.callback("В меню", "GO_TO_HOME"),
    ]

    if (page * limit < count) {
        nav.push(Markup.button.callback("Вперед", `PAGE:${page + 1}`))
    }

    keyboard.push(nav)

    return Markup.inlineKeyboard(keyboard);
}

module.exports = InlineKeyboard;