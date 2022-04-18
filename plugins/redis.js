const Redis = require("ioredis");

const {
    REDIS_HOST: host,
    REDIS_PORT: port,
    REDIS_PASSWORD: password
} = process.env;

const config = {
    host,
    port,
    family: 4
};

module.exports = new Redis(config);