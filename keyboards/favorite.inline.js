const { Markup } = require("telegraf")

const CreateKeyboard = (productId, page = 0, max) => {
    const behaviorButtons = [
            Markup.button.callback("Удалить из избранных", `DELETE_FAVORITE_PRODUCT:${productId}`),
            Markup.button.callback("В корзину", `ADD_TO_CART:${productId}`),
    ];

    const paginateButtons = [];
    if (page - 1 !== 0) {
        paginateButtons.push(Markup.button.callback("Назад", `SHOW_FAVORITES:${page - 1}`))
    }

    paginateButtons.push(Markup.button.callback("Обратно", `CART_EDIT_BACK`))

    if (max - 1 !== page) {
        paginateButtons.push(Markup.button.callback("Вперед", `SHOW_FAVORITES:${page + 1}`))
    }

    return new Markup.inlineKeyboard([
        behaviorButtons,
        paginateButtons,
    ])
}

module.exports = CreateKeyboard;