const express = require("express");
const router = express.Router();

const { CategoriesAction } = require("./categories");
const { CategoryAction } = require("./category");
const { CreateCategoryAction } = require("./create");
const { UpdateCategoryAction } = require("./update-category");

router.post("/", CategoriesAction);

router.post('/create', CreateCategoryAction);

router.post("/:id/update", UpdateCategoryAction);

router.post("/:id", CategoryAction);

module.exports = router;