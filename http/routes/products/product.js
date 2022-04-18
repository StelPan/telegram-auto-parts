const path = require("path");
const { product: model, category, image } = require(path.resolve("models"));

const ProductAction = async function (req, res) {
    try {
        const id = +req.param("id");
        const product = await model.findByPk(id, {
            include: [
                { model: category },
                { model: image, as: "images" }
            ]
        });

        res.status(200).json({
            product
        });
    } catch (error) {
        console.error(error);
    }
}

module.exports = { ProductAction };