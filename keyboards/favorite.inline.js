const { Markup } = require("telegraf")
const emoji = require("node-emoji");

const CreateKeyboard = (productId, page = 0, max) => {
    const behaviorButtons = [
            Markup.button.callback("В корзину", `ADD_CART_PRODUCT_FROM_FAVORITE:${productId}`),
            Markup.button.callback("Удалить " + emoji.get("negative_squared_cross_mark"), `DELETE_FAVORITE_PRODUCT:${productId}`),
    ];

    const paginateButtons = [];
    if (page - 1 !== 0) {
        paginateButtons.push(Markup.button.callback(emoji.get("arrow_left") + " Назад", `SHOW_FAVORITES:${page - 1}`))
    }

    paginateButtons.push(Markup.button.callback("Обратно " + emoji.get("leftwards_arrow_with_hook"), `CART_EDIT_BACK`))

    if (max !== page) {
        paginateButtons.push(Markup.button.callback("Вперед " + emoji.get("arrow_right"), `SHOW_FAVORITES:${page + 1}`))
    }

    return new Markup.inlineKeyboard([
        behaviorButtons,
        paginateButtons,
    ])
}

module.exports = CreateKeyboard;