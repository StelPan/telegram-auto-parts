const jwt = require("express-jwt");

// Jwt not checked routes
const unlessRoutes = [
    // /^\/auth\/client-info$/,
    /^\/auth\/login(.*)$/,
    /^\/auth\/logout(.*)$/,
    /^\/images\/(.*)$/,
    /^\/users(.*)$/, // TODO: Для создания дефолтного администратора
    /^\/register(.*)$/,
];

const { JSON_WEB_TOKEN } = process.env;

const JWTMiddleware = jwt({
    secret: JSON_WEB_TOKEN,
    algorithms: ['HS256']
})
    .unless({ path: unlessRoutes })

module.exports = { JWTMiddleware };