const path = require("path");
const { status } = require(path.resolve("models"));

const OrderStatusAction = async function (req, res) {
    try {
        const id = req.param("id");
        const searchStatus = await status.findByPk(id);
        res.status(200).json({
            status: searchStatus
        });
    } catch (error) {
        console.error(error);
    }
};

module.exports = { OrderStatusAction };