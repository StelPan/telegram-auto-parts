const path = require("path");
const bcrypt = require("bcrypt");
const { worker } = require(path.resolve("models"));

/**
 *
 * @param req
 * @param res
 * @returns {Promise<*>}
 * @constructor
 */
const DefaultAdminAction = async function (req, res) {
    try {
        const { user, login, password } = req.body;

        let findWorker = await worker.findOne({ where: { login }});
        if(findWorker) {
            return res.status(200).json({
                error: "EXIST_ADMINISTRATOR_LOGIN",
                msg: "A user with this login has already been created."
            });
        }

        findWorker = await worker.findOne({ where: { user_id: user.id }});
        if(findWorker) {
            return res.status(200).json({
                error: "EXIST_ADMINISTRATOR",
                msg: "The user is already an administrator"
            });
        }

        const passwordHash = bcrypt.hashSync(password, 0);

        await worker.create({
            user_id: user.id,
            password: passwordHash,
            login,
        });

        res.status(200).json({
            type: "ADMINISTRATOR_CREATED",
            msg: "Admin created successfully."
        });
    } catch (e) {
        console.error(e);
    }
};

module.exports = { DefaultAdminAction };