const jwt = require("express-jwt");

// Jwt not checked routes
const unlessRoutes = [
    // /^\/auth\/client-info$/,
    /^\/auth\/login(.*)$/,
    /^\/auth\/logout(.*)$/,
    /^\/images\/(.*)$/,
];

const { JSON_WEB_TOKEN } = process.env;
console.log(JSON_WEB_TOKEN)

const JWTMiddleware = jwt({
    secret: JSON_WEB_TOKEN,
    algorithms: ['HS256']
})
    .unless({ path: unlessRoutes })

module.exports = { JWTMiddleware };