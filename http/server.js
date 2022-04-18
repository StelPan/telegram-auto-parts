const dotenv = require("dotenv");
const path = require("path");
const express = require("express");
const paginate = require("express-paginate");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

dotenv.config({
    path: path.resolve("./", ".env")
})

// Middlewares
const { JWTMiddleware } = require("./middlewares/jwt");

const PORT = process.env.APP_PORT || 3000;
const API = process.env.APP_API || "127.0.4.3";

app.use(express.static("static"));
app.use(cors());
app.use(paginate.middleware(10, 30));
app.use(bodyParser.json());
app.use(JWTMiddleware);
app.use(function (err, req, res, next) {
    if (err.name === "UnauthorizedError") {
        res.status(401).json({
            error: "UNAUTHORIZED_ERROR",
            msg: "Token has been expired."
        });
    }
});

const sources = require("./routes/image");
app.use("/images", sources);
app.use("/auth", require("./routes/auth"));
app.use("/users", require("./routes/users"));
app.use("/products", require("./routes/products"));
app.use("/categories", require("./routes/categories"));
app.use("/orders", require("./routes/orders"));
app.use("/order-statuses", require("./routes/statuses"));

async function listen (cb = null) {
    cb(app)

    app.listen(API, PORT, () => console.log(`Server started on ${PORT}..`));
}

module.exports = listen;