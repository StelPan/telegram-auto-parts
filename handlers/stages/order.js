const { Composer } = require("telegraf");
const { user, product, status } = require("../../models");
const { ORDERS_TYPE } = require("../../keyboards/keyboard-keys");
const { ShowOrderAction } = require("../behaviors/order/show-order");
const orderKeyboard = require("../../keyboards/orders.keyboard");
const { template } = require("../../templates");

const composer = new Composer();

composer.action(/ORDER:[0-9]+/, ShowOrderAction);

composer.hears(ORDERS_TYPE, async (ctx) => {
    try {
        const clientCollect = await user.findByPk(ctx.from.id);

        const orders = await clientCollect.getOrders({
            include: [
                { model: product },
                { model: status },
            ],
            order: [["id", "desc"]]
        });

        const message = template.get("view-orders", orders);

        await ctx.replyWithHTML(message, orderKeyboard(orders));
    } catch (e) {
        console.error(e);
    }
});

module.exports = composer;