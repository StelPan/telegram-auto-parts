const path = require("path");
const { worker } = require(path.resolve("models"));
const { send: sendEmail } = require(path.resolve("email", "email"));

const Process = async (job, done) => {
    try {
        const { data: { order, subject } } = job;

        const workers = await worker.findAll();

        const configuration = {
            to: order.data.email, // TODO: Добавить в профиль администраторов колонку с e-mail
            subject,
            template: "/worker/create-order",
            context: { order },
        };

        await sendEmail(configuration);

        return done();
    } catch(e) {
        console.error(e);
        done();
    }
};

module.exports = Process;