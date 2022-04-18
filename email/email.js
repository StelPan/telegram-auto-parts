const { Transporter } = require("../plugins/mailer");

const { MAIL_LOGIN } = process.env;

const defaultConfig = {
    from: `"Шестеренка" <${MAIL_LOGIN}>`,
}

const send = async function (config = {}) {
    const assignConfig = Object.assign(
        defaultConfig,
        config
    );

    await Transporter.sendMail(assignConfig);
}

module.exports = {
    send
};

