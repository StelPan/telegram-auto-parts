const path = require("path");
const { worker } = require(path.resolve("models"));

const UpdateEmailAction = async function (req, res) {
    try {
        const { user, body } = req;
        const { email } = body;

        const currentClient = await worker.findOne({
            where: { user_id: user.id }
        });

        currentClient.update({ email });

        return res.status(200).json({
            type: "CHANGED_EMAIL",
            msg: "Email changed successfully."
        });
    } catch (e) {
        console.error(e);
    }
};

module.exports = {
  UpdateEmailAction,
};