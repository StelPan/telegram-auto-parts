const path = require("path");
const { token } = require(path.resolve("models"));

const LogoutAction = async function (req, res) {
    try {
        const { refresh } = req.body;
        const findRefresh = await token.findOne({ where: { refresh }});
        if (!findRefresh) {
            res.status(404).json({
                type: "REFRESH_NOT_FOUND",
                msg: `Refresh token: ${refresh} not found.`
            });
            return;
        }

        await findRefresh.destroy();

        res.status(200).json({
            type: "LOGOUT_SUCCESS",
            msg: "Logout successfully",
        });
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    LogoutAction,
};