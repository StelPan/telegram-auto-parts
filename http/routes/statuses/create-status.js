const path = require("path");
const { status } = require(path.resolve("models"));

const CreateOrderStatusAction = async function (req, res) {
    try {
        const data = req.body;

        const findStatus = await status.findOne({ where: { name: data.name }});
        if (findStatus) {
            return res.status(400).json({
                error: "STATUS_EXISTS",
                msg: "STATUS: '" + data.name + "'" + "exists"
            });
        }

        const createStatus = await status.create(data);
        res.status(200).json({
            type: "STATUS_CREATED",
            msg: "STATUS: '" + createStatus.name + "'" + "has been created."
        });
    } catch (error) {
        console.error(error);
    }
}

module.exports = { CreateOrderStatusAction };