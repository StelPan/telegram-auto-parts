const axios = require("axios");

const { TELEGRAM_WEBHOOK_URL } = process.env;

const http = axios.create({
    baseURL: TELEGRAM_WEBHOOK_URL
})

module.exports = http;