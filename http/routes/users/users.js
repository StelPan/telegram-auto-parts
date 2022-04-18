const path = require("path");
const { user } = require(path.resolve("models"));

const UsersAction = async function (req, res) {
    try {
        const
            offset = req?.skip,
            limit = req.query?.limit;

        const users = await user.findAll({
            offset,
            limit
        });

        const count = users.length;
        const pages = Math.ceil(count / limit);

        res.status(200).json({
            users,
            count,
            pages,
        })
    } catch(error) {
        console.error(error);
    }
};

module.exports = { UsersAction };