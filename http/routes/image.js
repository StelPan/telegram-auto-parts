const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");

router.get("/:file", async function (req, res) {
    try {
        const pathFile = path.resolve(
            "storage",
            "images",
            req.params.file
        )

        const exist = fs.existsSync(pathFile);
        if (!exist) {
            res
                .status(404)
                .json({ msg: "File not found" })

            return;
        }

        res
            .status(200)
            .sendFile(pathFile);
    } catch (err) {
        console.warn(err)
    }
});

module.exports = router;