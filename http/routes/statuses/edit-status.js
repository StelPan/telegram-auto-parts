const path = require("path");
const { status } = require(path.resolve("models"));

const EditOrderStatusAction = async function (req, res) {
    try {
        const id = req.param("id");
        const body = req.body;

        const searchStatus = await status.findByPk(id);
        await searchStatus.update(body);

        res.status(200).json({
            type: "UPDATE_STATUS",
            msg: "Status update successfully."
        });
    } catch (error) {
        console.error(error);
    }
};

module.exports = { EditOrderStatusAction };