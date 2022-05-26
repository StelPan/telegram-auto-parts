const { Template } = require("./template");

const createTemplate = new Template();

createTemplate.push("view-orders", require("./views/view-orders"));

module.exports = {
    template: createTemplate
};