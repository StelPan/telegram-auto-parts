const path = require("path");
const { worker, user } = require(path.resolve("models"));

const ClientInfoAction = async function (req, res) {
    try {
        const { id } = req.user;
        const findWorker = await worker.findOne({
            where: { user_id: id },
            include: [{ model: user }]
        })

        res.status(200).json({
            worker: findWorker,
            type: "CLIENT_INFO"
        });
    } catch (e) {
        console.error(e);
    }
}

module.exports = { ClientInfoAction };