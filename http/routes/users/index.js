const express = require("express");
const router = express.Router();

const { UsersAction } = require("./users");
const { UserAction } = require("./user");

// Возвращает список всех пользователей
router.post("/", UsersAction);

// Возвращает кокретного пользователя, поиск по параметрам
router.post("/:id", UserAction);

module.exports = router;