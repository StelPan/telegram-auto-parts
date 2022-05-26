const path = require("path");
const { worker } = require(path.resolve("models"));
const { send: sendEmail } = require(path.resolve("email", "email"));

const Process = async (job, done) => {
    try {
        const workers = await worker.findAll();

        const emails = workers
            .filter(worker => worker.email ? worker.email : false)
            .map(worker => worker.email)
            .join(", ");

        if (!emails.length) {
            return done();
        }

        const { data: { order, subject } } = job;

        const configuration = {
            to: emails,
            subject,
            template: "/admin/create-order",
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