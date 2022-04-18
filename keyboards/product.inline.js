const { Markup } = require("telegraf");
const emoji = require("node-emoji");

const createKeyboard = (productId, inCartExist, inFavoriteExist, productPage, categoryId) => {
    return Markup.inlineKeyboard([
        [
            Markup.button.callback(`${inCartExist ? "В корзине" : "В корзину"}` + " " + emoji.get("shopping_trolley"), `ADD_TO_CART:${productId}`),
            Markup.button.callback(`${inFavoriteExist ? "В избранном" : "В избранное"}` + " " + emoji.get("heart"), `ADD_TO_FAVORITE:${productId}`),
        ],
        [
            Markup.button.callback(emoji.get("arrow_left") + " Назад", `CATEGORY:${categoryId};PAGE_PRODUCT:${productPage - 1}`),
            Markup.button.callback("Обратно " + emoji.get("leftwards_arrow_with_hook"), "GO_TO_CATALOG"),
            Markup.button.callback("Вперед " + emoji.get("arrow_right"), `CATEGORY:${categoryId};PAGE_PRODUCT:${productPage + 1}`)
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
            changedKeyboard[0][0].text = text + " " + emoji.get("shopping_trolley")
            return this
        },

        editFavoriteButton (text) {
            changedKeyboard[0][1].text = text + " " + emoji.get("heart")
            return this
        }
    }
}

const keyboard = {
    createKeyboard,
    editProductKeyboard
}

module.exports = keyboard