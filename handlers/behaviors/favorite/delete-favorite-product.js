const path                  = require("path");
const { favorite }          = require(path.resolve("models"));
const { ShowCartAction }    = require("../cart/show-cart");

async function DeleteFavoriteProduct (ctx) {
    try {
        const {
            data,
            from: { id }
        } = ctx.update.callback_query;

        const [ , productId] = data.split(":");

        const [findFavorite, ] = await favorite.findOrCreate({ where: {user_id: id}})
        await findFavorite.removeProduct(productId);

        await ctx.deleteMessage();
        await ShowCartAction(ctx);
    } catch (e) {
        console.log(e);
    }
}

module.exports = {
    DeleteFavoriteProduct,
};