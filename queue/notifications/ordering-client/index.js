const { createQueue } = require("../../queue-connect");
const process = require("./process");

const Queue = createQueue("client-order-notification");
Queue.process(process);

module.exports = (data, config = {}) => {
    Object.assign(
        config,
        { removeOnComplete: true }
    );

    Queue.add(data, config);
};