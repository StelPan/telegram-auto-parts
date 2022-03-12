const { Composer, Scenes: { Stage } } = require("telegraf")

const stage = new Stage()

// Дефолтная сцена
stage.register(require("../scenes/preview.scene"))

// Отображение каталога
stage.register(require("../scenes/catalog.scene"))

// Корзина пользователя
stage.register(require("../scenes/cart.scene"));

const composer = new Composer()
composer.use(stage.middleware())

module.exports = composer