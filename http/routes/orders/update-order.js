const path = require("path");
const { order, product } = require(path.resolve("models"));
const notify = require(path.resolve("queue", "notifications", "ordering-client"));

const UpdateOrderAction = async function (req, res) {
    try {
        const data = req.body;
        const { updateParams, notifyClient } = data;

        const findOrder = await order.findByPk(updateParams.id, {
            include: [{ model: product, as: "products" }]
        });
        if (!findOrder) {
            return res.status(404).json({
                error: "NOT_FOUND_ORDER",
                msg: "Order id: " + updateParams.id + ". Not found."
            });
        }

        await findOrder.update(updateParams);
        if(notifyClient) {
            notify({
                order,
                products: order.products,
                subject: "Обновление по заказу"
            })
        }

        res.status(200).json({
            type: "ORDER_UPDATED",
            msg: "Order id: " + findOrder.id + ". Successfully updated."
        })
    } catch (e) {
        console.error(e);
    }
};

module.exports = { UpdateOrderAction };
