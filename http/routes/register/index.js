const express = require("express");
const router = express.Router();

const { DefaultAdminAction } = require("./default-admin");

// Создает первоначального администратора
router.post("/default-administrator", DefaultAdminAction);

module.exports = router;