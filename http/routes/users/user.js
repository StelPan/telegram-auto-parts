const path = require("path");
const { user } = require(path.resolve("models"));

const UserAction = async function (req, res) {
    try {
        const { id } = req.body;
        const findUser = await user.findByPk(id);
        res.status(200).json({ user })
    } catch (error) {
        console.error(error);
    }
};

module.exports = { UserAction };