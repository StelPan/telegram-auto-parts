const { createQueue } = require("../../queue-connect");
const process = require("./process");

const Queue = createQueue("client-order-notification");
Queue.process(process);

module.exports = (data, config = {}) => {
    const assignConfig = Object.assign(
        config,
        { removeOnComplete: true }
    );

    Queue.add(data, assignConfig);
};