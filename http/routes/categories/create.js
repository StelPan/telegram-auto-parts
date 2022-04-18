const path = require("path");
const { category } = require(path.resolve("models"));

const CreateCategoryAction = async function (req, res) {
    try {
        const body = req.body;
        await category.create({
            name: body.name,
            is_show: true,
        });

        res.status(200).json({
            type: "CATEGORY_CREATED",
            msg: "Category created successfully."
        });
    } catch (e) {
        console.error(e);
    }
}

module.exports = { CreateCategoryAction };