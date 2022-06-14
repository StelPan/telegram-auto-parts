const {user, product, status} = require("../../../models");
const {template} = require("../../../templates");
const orderKeyboard = require("../../../keyboards/orders.keyboard");

async function ShowOrders (ctx) {
    try {
        const clientCollect = await user.findByPk(ctx.from.id);

        const orders = await clientCollect.getOrders({
            include: [
                { model: product },
                { model: status },
            ],
            order: [["id", "desc"]],
            limit: 10
        });

        const message = template.get("view-orders", orders);

        await ctx.replyWithHTML(message, orderKeyboard(orders));
    } catch (e) {
        console.error(e);
    }
}

module.exports = ShowOrders;