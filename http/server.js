const dotenv = require("dotenv");
const path = require("path");
const express = require("express");
const paginate = require("express-paginate");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

dotenv.config({
    path: path.resolve("./", ".env")
});

const PORT = process.env.APP_PORT || 3000;
const API = process.env.APP_IP || "127.0.0.1";

app.use(cors({
    origin: "*",
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH'],
}));

app.use(express.static(path.resolve("static")));

app.use("/images", require("./routes/image"));

app.get('*', function (req, res) {
    try {
        res.sendFile(path.resolve("static", "index.html"));
    } catch(e) {
        console.error(e);
    }
});

app.use(require("./middlewares/jwt").JWTMiddleware);

app.use(paginate.middleware(10, 30));

app.use(bodyParser.json());

app.use(function (err, req, res, next) {
    if (err.name === "UnauthorizedError") {
        res.status(401).json({
            error: "UNAUTHORIZED_ERROR",
            msg: "Token has been expired."
        });
    }
});

app.use("/auth", require("./routes/auth"));
app.use("/users", require("./routes/users"));
app.use("/products", require("./routes/products"));
app.use("/categories", require("./routes/categories"));
app.use("/orders", require("./routes/orders"));
app.use("/order-statuses", require("./routes/statuses"));
app.use("/register", require("./routes/register"));

async function listen (cb = null) {
    cb(app);

    app.listen(PORT, API, () => console.log(`Server started on ${PORT}..`));
}

module.exports = listen;