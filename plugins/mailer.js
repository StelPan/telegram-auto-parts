const Path = require("path");
const NodeMailer = require("nodemailer");
const NodeMailerHandleBars = require("nodemailer-express-handlebars");

const {
    MAIL_PORT,
    MAIL_LOGIN,
    MAIL_PASSWORD,
    MAIL_HOST
} = process.env;

const Transporter = NodeMailer.createTransport({
    host: MAIL_HOST,
    port: MAIL_PORT,
    secure: false,
    auth: {
        user: MAIL_LOGIN,
        pass: MAIL_PASSWORD
    }
});

Transporter.use("compile", NodeMailerHandleBars({
    viewEngine: {
        partialsDir: Path.resolve("mail"),
        extName: ".handlebars",
        defaultLayout: false,
    },
    viewPath: Path.resolve("email", "templates")
}));

module.exports = {
    Transporter
};