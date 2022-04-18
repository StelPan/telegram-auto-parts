const { v4: uuid }  = require("uuid");
const jwt           = require("jsonwebtoken");

const { JSON_WEB_TOKEN } = process.env;

const createRefreshToken = function () {
    return uuid();
}

const createAccessToken = function (data, options = {}) {
    if (typeof data !== "object" || data === null) {
        throw new Error("Parameter 'data' must be a object.");
    }

    const defaultOptions = {
        expiresIn: 60 * 60,
        algorithm: "HS256"
    }

    const assignOptions = Object.assign(options, defaultOptions);
    return jwt.sign(data, JSON_WEB_TOKEN, assignOptions);
};

module.exports = {
    createAccessToken,
    createRefreshToken,
}