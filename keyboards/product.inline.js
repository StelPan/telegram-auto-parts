const { Markup } = require("telegraf")

const createKeyboard = (productId, inCartExist, productPage, categoryId) => {
    return Markup.inlineKeyboard([
        [
            Markup.button.callback(`${inCartExist ? "В корзине" : "В корзину"}`, `ADD_TO_CART:${productId}`),
            Markup.button.callback("В избранное", `ADD_TO_FAVORITE:${productId}`),
        ],
        [
            Markup.button.callback("Назад", `CATEGORY:${categoryId};PAGE_PRODUCT:${productPage - 1}`),
            Markup.button.callback("Обратно", "GO_TO_CATALOG"),
            Markup.button.callback("Вперед", `CATEGORY:${categoryId};PAGE_PRODUCT:${productPage + 1}`)
        ]
    ])
}

const editProductKeyboard = function (keyboard) {
    let changedKeyboard = keyboard

    return {
        getKeyboard () {
            return changedKeyboard
        },

        arrayToInline () {
            const buttons = []

            for (let buttonLine of this.getKeyboard()) {
                const inline = []

                for (let { text, callback_data } of buttonLine)  {
                    inline.push(Markup.button.callback(text, callback_data))
                }

                buttons.push(inline)
            }

            changedKeyboard = Markup.inlineKeyboard(buttons)

            return this
        },

        editCartButton (text) {
            changedKeyboard[0][0].text = text
            return this
        },

        editFavoriteButton (text) {
            changedKeyboard[0][1].text = text
            return this
        }
    }
}

const keyboard = {
    createKeyboard,
    editProductKeyboard
}

module.exports = keyboard