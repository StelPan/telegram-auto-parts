const express = require("express");
const router = express.Router();

const { ProductsAction } = require("./products");
const { ProductAction } = require("./product");
const { CreateProductAction } = require("./add");
const { UpdateProductAction } = require("./update");

// Возвращает JSON всех товаров
router.post("/", ProductsAction);

// Создает новый товар
router.post("/create", CreateProductAction);

// Обновляет товар
router.post("/:id/update", UpdateProductAction);

// Возвращает JSON товара по его идентификатору
router.post("/:id", ProductAction);

module.exports = router;