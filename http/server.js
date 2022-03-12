const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const sources = require("./routes/image")

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use("/images", sources);

async function listen (cb = null) {
    cb(app)

    app.listen(PORT, () => console.log(`Server started on ${PORT}..`));
}

module.exports = listen;