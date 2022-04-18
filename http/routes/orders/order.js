const path = require("path");
const { order, status, user, product } = require(path.resolve("models"));

const OrderAction = async function (req, res) {
    try {
        const id = req.param("id");
        const searchOrder = await order.findOne({
            where: { id },
            include: [
                { model: status },
                { model: user, },
                { model: product },
            ]
        });

        res.status(200).json({
            order: searchOrder
        })
    } catch (error) {
        console.error(error);
    }
}

module.exports = { OrderAction };