const _ = require("lodash");
const path = require("path");
const bcrypt = require("bcrypt");
const { worker } = require(path.resolve("models"));

const PasswordResetAction = async function (req, res) {
    try {
        const { id } = req.user;

        const {
            password,
            newPassword,
            newPasswordConfirm
        } = req.body;

        const currentClient = await worker.findOne({
            where: { user_id: id }
        });

        if (!_.isEqual(newPassword, newPasswordConfirm)) {
            return res.status(403).json({
                error: "NOT_EQUAL_PASSWORDS",
                msg: "New password not equal password confirmation."
            });
        }

        if (!bcrypt.compareSync(password, currentClient.password)) {
            return res.status(403).json({
                error: "INVALID_PASSWORD",
                msg: "Old password is not valid."
            });
        }

        const hash = bcrypt.hashSync(newPassword, 0);

        await currentClient.update({
            password: hash
        });

        return res.status(200).json({
            type: "SUCCESS_RESET_PASSWORD",
            msg: "Password updated successfully"
        });
    } catch (e) {
        console.error(e);
    }
};

module.exports = {
    PasswordResetAction,
};