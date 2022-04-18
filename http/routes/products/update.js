const fs = require("fs");
const path = require("path");
const formidable = require("formidable");
const { product, image } = require(path.resolve("models"));

const UpdateProductAction = async function (req, res) {
    const form = formidable({multiples: true});

    form.parse(req, async (err, fields, files) => {
        try {
            if (err) {
                return res.status(500).json({
                    error: "UPDATE_PRODUCT_ERROR",
                    msg: err
                });
            }

            const id = req.param("id");
            const selectProduct = await product.findByPk(id, {
                include: [{ model: image }]
            });
            if (!selectProduct) {
                return res.status(404).json({
                    error: "PRODUCT_NOT_FOUND",
                    msg: `Product: ${id}. Not found`
                });
            }

            let
                newFileName = null,
                newFile     = null;

            if (files.file instanceof formidable.PersistentFile) {
                newFileName = files.file.newFilename + ".jpg";
                const oldSourcePath = files.file.filepath;
                const newSourcePath = path.resolve("storage", "images", newFileName);
                const rawData = fs.readFileSync(oldSourcePath);

                fs.writeFileSync(newSourcePath, rawData);

                if (selectProduct.images.length) {
                    fs.unlinkSync(path.resolve("storage", "images", selectProduct.images[0].source));
                    await selectProduct.removeImages();
                }

                newFile = await image.create({
                    type: "jpg",
                    source: newFileName
                });
            }

            if (newFile) {
                await selectProduct.setImages(newFile);
            }

            if (fields.category) {
                await selectProduct.setCategories(fields.category);
            }

            delete fields.category;

            await selectProduct.update({ ...fields });

            res.status(200).json({
                type: "PRODUCT_UPDATED",
                msg: "Product updated successfully."
            });
        } catch (e) {
            console.error(e);
        }
    })
};

module.exports = { UpdateProductAction };