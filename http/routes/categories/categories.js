const path = require("path");
const { category } = require(path.resolve("models"));

const CategoriesAction = async function (req, res) {
    try {
        const
            offset = req?.skip,
            limit  = req.query?.limit;

        const categoriesQuery = category.findAll({
            offset,
            limit,
            order: [["id", "desc"]]
        });

        const countQuery = category.count();

        const [categories, count] = await Promise.all([
            categoriesQuery,
            countQuery
        ]);

        const pages = Math.ceil(count / limit);

        res.status(200).json({
            categories,
            paginate: {
                countPage: count,
                perPage: pages
            }
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports = { CategoriesAction };