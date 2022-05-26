async function FaqAction (ctx) {
    try {
        await ctx.reply(
            `- Добавляйте товары, нажав на кнопку "В корзину" \r\n` +
            `- Добавляйте товары в "Избранные" нажав на кнопку добавить "в избранное" \r\n`
        );
    } catch (e) {
        console.error(e);
    }
}

module.exports = {
    FaqAction
};