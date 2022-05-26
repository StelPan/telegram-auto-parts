const { Composer } = require("telegraf");

const {
    CatalogAction,
    PaginateCatalogAction
} = require("../behaviors/catalog.action");
const { ShowCartAction } = require("../behaviors/cart/show-cart");
const ShowOrders = require("../behaviors/order/show-orders");

const ActionsComposer = new Composer();

// Вывод категорий в постраничной пагинации
ActionsComposer.action(
    /^PAGE:[0-9]+$/,
    PaginateCatalogAction
);

// Показывает товар из каталога
ActionsComposer.action(
    /(CATEGORY:[0-9]+;PAGE_PRODUCT:[0-9]+)/,
    require("../behaviors/catalog/view-product")
);

ActionsComposer.action(
    /ADD_TO_CART:[0-9]+/,
    require("../behaviors/catalog/add-to-cart")
);

ActionsComposer.action(
    /ADD_TO_FAVORITE:[0-9]+/,
    require("../behaviors/catalog/add-to-favorite")
);


ActionsComposer.action(
    /CLEAR_CART/,
    require("../behaviors/cart/clear-cart").ClearCartAction
);

ActionsComposer.action(
    /^CART_DELETE_PRODUCT:[0-9]+$/,
    require("../behaviors/cart/delete-product").DeleteProductAction
);

ActionsComposer.action(
    /^CART_EDIT_PAGE:[0-9]+$/,
    require("../behaviors/cart/edit-cart").EditCartAction,
);

ActionsComposer.action(/^CART_EDIT_BACK$/, async (ctx) => {
    await ctx.deleteMessage();
    await ShowCartAction(ctx);
});

ActionsComposer.action(
    /^SHOW_FAVORITES:[0-9]+$/,
    require("../behaviors/favorite/show-favorites").ShowFavorites
);

// Начало оформления заказа
ActionsComposer.action(/ORDER_COMPLETE/, async (ctx) => {
    await Promise.all([
        ctx.scene.enter("CompleteOrder"),
    ]);
});

ActionsComposer.action(
    /ADD_CART_PRODUCT_FROM_FAVORITE:[0-9]+/,
    require("../behaviors/favorite/add-cart-from-favorite").AddCartFromFavorite
);

ActionsComposer.action(
    /^DELETE_FAVORITE_PRODUCT:[0-9]+$/,
    require("../behaviors/favorite/delete-favorite-product").DeleteFavoriteProduct
);

ActionsComposer.action(/(GO_TO_CATALOG|GO_TO_HOME)/, async (ctx) => {
    await ctx.answerCbQuery();
    await ctx.deleteMessage();
});


ActionsComposer.action(/GO_TO_ORDERS/, async (ctx) => {
    await ctx.deleteMessage();
    await ShowOrders(ctx);
});

module.exports = { ActionsComposer };