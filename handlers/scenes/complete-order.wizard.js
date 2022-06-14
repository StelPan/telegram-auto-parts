const path = require("path");
const { Scenes: { WizardScene } } = require("telegraf");
const { startAction } = require("../behaviors/start.action");
const { order, cart, status } = require(path.resolve("models"));
const notifyClient  = require(path.resolve("queue", "notifications", "ordering-client"));
const notifyAdmin   = require(path.resolve("queue", "notifications", "ordering-workers"));

const SCENE_TYPE = "CompleteOrder";

const CompleteOrder = new WizardScene(
    SCENE_TYPE,
    async (ctx) => {
        try {
            const address = ctx
                .update
                .message
                .text;

            ctx.session.orderRegistered = {
                address,
            };

            await ctx.reply("Введите номер мобильного телефона:");
            await ctx.wizard.next();
        } catch (e) {
            console.error(e);
        }
    }, async (ctx) => {
        const phone = ctx
            .update
            .message
            .text;

        ctx
            .session
            .orderRegistered
            .phone = phone;

        await ctx.reply("Введите адрес электронной почты:");
        await ctx.wizard.next();
    }, async (ctx) => {
        const email = ctx
            .update
            .message
            .text;

        ctx
            .session
            .orderRegistered
            .email = email;

        const clientCart = await cart.findOne({ where: { user_id: ctx.from.id }});
        const clientProducts = await clientCart.getProducts();

        let total_cash = clientProducts.reduce((preview, current) => preview + current.get("price"), 0);

        let data = {
            ...ctx.session.orderRegistered,
            products: clientProducts,
            total_cash,
        }

        const createOrder = await order.create({
            user_id: ctx.from.id,
            data,
            total_cash,
        });

        for (let product of clientProducts) {
            await createOrder.addProduct(product);
            await clientCart.removeProduct(product.id);
        }

        const defaultStatus = await status.findOne({
            order: [["id", "asc"]]
        });

        await createOrder.setStatus(defaultStatus);

        let message = `Заказ успешно оформлен. \r\n` +
            `Ваш номер заказа: ${createOrder.id} \r\n` +
            `Узнать статус и дополнительную информацию по заказу вы можете, нажав по кнопке, "Заказы". \r\n` +
            `Ожидайте звонка!`;

        await ctx.reply(message);

        await notifyClient({
            order: createOrder,
            products: clientProducts,
            subject: "Новый заказ"
        });

        await notifyAdmin({
            order: createOrder,
            subject: "Новый заказ"
        });

        await ctx.scene.leave();
        await startAction(ctx);
    });

CompleteOrder.enter(async (ctx) => {
    const clientCart = await cart.findOne({ where: { user_id: ctx.from.id }});
    const clientProducts = await clientCart.getProducts();

    if(!clientProducts.length) {
        await ctx.answerCbQuery(
            "Вы не можете оформить заказ. \r\n" +
            "Ваша корзина пуста."
        );

        await ctx.scene.leave();

        return;
    }

    await ctx.deleteMessage();
    await ctx.reply("Введите адресс доставки:", {
        reply_markup: {
            remove_keyboard: true,
        }
    });
});

module.exports = CompleteOrder;