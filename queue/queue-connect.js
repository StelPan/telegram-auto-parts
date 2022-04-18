const Bull = require("bull");

const {
    REDIS_HOST: host,
    REDIS_PORT: port,
} = process.env;

const config = {
    redis: { host, port, },
};

/**
 *
 * @param name
 * @returns {Queue}
 */
const createQueue = (name) => Bull(
    name,
    config,
);

module.exports = {
    createQueue
};