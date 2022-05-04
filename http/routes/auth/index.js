const express = require("express");
const router = express.Router();

const { LoginAction } = require("./login");
const { LogoutAction } = require("./logout");
const { ClientInfoAction } = require("./client-info");
const { UpdateProfileAction } = require("./update-profile");
const { PasswordResetAction } = require("./password-reset");
const { UpdateEmailAction } = require("./update-email");

// Авторзация клиента
router.post("/login", LoginAction);

// Маршрут удаления токен и деаутендификации
router.post("/logout", LogoutAction);

// Получение информации о текущем профиле
router.post("/client-info", ClientInfoAction);

// Маршкрут обновления данных о текущем профиле
router.post("/profile/update", UpdateProfileAction);

// Изменение пароля
router.post("/profile/reset-password", PasswordResetAction);

// Обновление почты администратора
router.post("/profile/change-email", UpdateEmailAction);

module.exports = router;

