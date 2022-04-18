const path = require("path");
const { order, user, product, status } = require(path.resolve("models"));

const OrdersAction = async function (req, res) {
    try {
        const
            offset = req.skip,
            limit  = req.query?.limit;

        const ordersQuery = order.findAll({
            limit,
            offset,
            include: [
                { model: user },
                { model: product },
                { model: status }
            ]
        });

        const countQuery = order.count();

        const [orders, count] = await Promise.all([
            ordersQuery,
            countQuery
        ]);

        const pages = Math.ceil(count / limit);

        res.status(200).json({
            orders,
            paginate: {
                count,
                pages,
            }
        });
    } catch (error) {
        console.error(error);
    }
}

module.exports = { OrdersAction };