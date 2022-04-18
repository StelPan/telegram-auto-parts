const path = require("path");
const { send: sendEmail } = require(path.resolve("email", "email"));

const Process = async (job, done) => {
    try {
        const { data: { order, products, subject } } = job;

        const configuration = {
            to: order.data.email,
            subject,
            template: "/client/create-order",
            context: { order, products },
        };

        await sendEmail(configuration);

        return done();
    } catch(e) {
        console.error(e);
        done();
    }
};

module.exports = Process;