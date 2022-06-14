const path = require("path");
const { order, user, product, status } = require(path.resolve("models"));

const OrdersAction = async function (req, res) {
    try {
        const
            id     = req.query?.id,
            offset = req.skip,
            limit  = req.query?.limit,
            statusName = req.query?.status;

        const includes = {
            "status": {
                model: status
            },
            "user": { model: user },
            "product": { model: product }
        };


        if (statusName) {
            includes.status.where = { name: statusName }
        }

        const queryParameters = {
            limit,
            offset,
            include: Object.keys(includes).map(model => includes[model]),
            order: [["id", "desc"]]
        }

        if (id) {
            queryParameters.where = { id }
        }

        const ordersQuery = order.findAll(queryParameters);
        const countQuery = order.count();

        const [orders, count, statuses] = await Promise.all([
            ordersQuery,
            countQuery
        ]);

        const pages = Math.ceil(count / limit);

        res.status(200).json({
            orders,
            statuses,
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