const { Composer } = require("telegraf")

const middlewares = new Composer();

middlewares.use(
    require("./new-user.middleware")
    // Use any middlewares
);

module.exports = middlewares;