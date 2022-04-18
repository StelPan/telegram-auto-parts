const { Composer, Scenes: { Stage } } = require("telegraf");

const stage = new Stage();
stage.register(require("../scenes/complete-order.wizard"));

const composer = new Composer();
composer.use(stage.middleware());

module.exports = composer;