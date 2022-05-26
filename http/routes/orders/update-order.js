const path = require("path");
const { order, product, status } = require(path.resolve("models"));
const notify = require(path.resolve("queue", "notifications", "ordering-client"));

async function UpdateUserOrder (form, order) {
    let updateParams = {}
    if (
        form.hasOwnProperty("worker_comments") &&
        typeof form.worker_comments === "string" &&
        form.worker_comments.length
    ) {
        updateParams.worker_comments = form.worker_comments;
    }

    await Promise.all([
        order.setStatus(form.status.id),
        order.setProducts(...form.products),
        order.update(updateParams)
    ]);
}

const UpdateOrderAction = async function (req, res) {
    try {
        const id = req.param("id");
        const { form, notify: isNotify } = req.body;

        const findOrder = await order.findByPk(id, {
            include: [
                { model: product, as: "products", },
                { model: status, as: "status" }
            ]
        });

        if (!findOrder) {
            return res.status(404).json({
                error: "NOT_FOUND_ORDER",
                msg: "Order id: " + id + ". Not found."
            });
        }

        await UpdateUserOrder(form, findOrder);

        if(isNotify) {
            notify({
                order,
                products: order.products,
                subject: "Обновление по заказу"
            });
        }

        res.status(200).json({
            type: "ORDER_UPDATED",
            msg: "Order id: " + id + ". Successfully updated."
        });
    } catch (e) {
        console.error(e);
    }
};

module.exports = {
    UpdateOrderAction
};
