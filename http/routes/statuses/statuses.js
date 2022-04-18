const path = require("path");
const { status } = require(path.resolve("models"));

const StatusesAction = async function (req, res) {
    try {
        const statuses = await status.findAll();
        res.status(200).json({
            statuses,
            order: [["id", "desc"]]
        });
    } catch (error) {
        console.error(error);
    }
}

module.exports = { StatusesAction };