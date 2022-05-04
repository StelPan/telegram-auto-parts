const path = require("path");
const { category } = require(path.resolve("models"));

const CategoryAction = async function (req, res) {
    try {
        const id = req.param("id");
        const findCategory = await category.findByPk(id);

        res
            .status(200)
            .json({
                category: findCategory
            });
    } catch(error) {
        console.error(error);
    }
}

module.exports = { CategoryAction };