const path = require("path");
const { category } = require(path.resolve("models"));

const UpdateCategoryAction = async function (req, res) {
    try {
        const id = req.param("id");
        const body = req.body;

        const findCategory = await category.findByPk(id);
        if (!findCategory) {
            return res.status(404).json({
                error: "CATEGORY_NOT_FOUND",
                msg: "Category id:" + id + ". Not found"
            });
        }

        await findCategory.update({ ...body });

        res.status(200).json({
            type: "CATEGORY_UPDATED",
            msg: "Updated category successfully"
        });
    } catch (e) {
        console.error(e);
    }
};

module.exports = { UpdateCategoryAction };