const fs = require("fs");
const path = require("path");
const formidable = require("formidable");
const { product, image } = require(path.resolve("models"));

const CreateProductAction = async function (req, res) {
    try {
        const form = formidable({
            multiples: true
        });

        form.parse(req, async (err, fields, files) => {
            try {
                const {
                    name,
                    price,
                    description,
                    category,
                } = fields;

                const findProduct = await product.findOne({ where: { name }});
                if (findProduct) {
                    res.status(400).json({
                        error: "PRODUCT_UNIQUE_NAME",
                        msg: `Product with name ${name} was created.`,
                    });

                    return;
                }

                const newFileName = files.file.newFilename + ".jpg";
                const oldSourcePath = files.file.filepath;
                const newSourcePath = path.resolve("storage", "images", newFileName);
                const rawData = fs.readFileSync(oldSourcePath)
                fs.writeFileSync(newSourcePath, rawData);

                const createImage = await image.create({
                    type: "jpg",
                    source: newFileName,
                });

                const createProduct = await product.create({
                    name,
                    price,
                    description,
                });

                await createProduct.addImage(createImage);

                await createProduct.setCategories([category]);

                res.status(200).json({
                    type: "PRODUCT_CREATED",
                    msg: `Product: ${name} was created successfully.`
                });
            } catch (error) {
                console.error(error);
            }
        });
    } catch(error) {
        console.error(error);
    }
}

module.exports = { CreateProductAction };