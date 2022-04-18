const path = require("path");
const { product } = require(path.resolve("models"));

const ProductsAction = async function (req, res) {
    try {
        const
            offset = req?.skip,
            limit = req?.query?.limit;

        const productQuery = product.findAll({
            offset,
            limit,
            order: [["id", "DESC"]]
        });

        const countQuery = product.count();

        const [count, products] = await Promise.all([
            countQuery,
            productQuery
        ]);

        const countPage = Math.ceil(count / limit);

        res.status(200).json({
           products,
           paginate: {
               countPage,
               countElements: count,
           }
        });
    } catch(error) {
        console.error(error);
    }
}

module.exports = { ProductsAction };