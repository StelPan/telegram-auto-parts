const path = require("path");
const bcrypt = require("bcrypt");
const { worker, token, user } = require(path.resolve("models"));

const {
    createAccessToken,
    createRefreshToken
} = require(path.resolve("http", "helpers", "issue-tokens.helper"));

const LoginAction = async function (req, res) {
    try {
        const { login, password } = req.body;

        const findWorker = await worker.findOne({
            where: { login },
            include: [{ model: user }]
        });
        if (!findWorker) {
            res.status(403).json({
                error: "INVALID_CREDENTIALS",
                msg: "Invalid credentials"
            });
            return;
        }

        const {
            user_id: id,
            password: hash
        } = findWorker;

        if (!bcrypt.compareSync(password, hash)) {
            res.status(403).json({
                error: "INVALID_CREDENTIALS",
                msg: "Invalid credentials"
            });
            return;
        }

        const access = createAccessToken({ id });
        const refresh = createRefreshToken();

        await token.create({
            refresh,
            client_id: findWorker.id,
            expire: Date.now() + 60 * 60 * 24,
        })

        // TODO: отправляем токены
        res.status(200).json({
            tokens: { access, refresh },
            worker: findWorker,
            type: "Bearer",
        })
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    LoginAction
};