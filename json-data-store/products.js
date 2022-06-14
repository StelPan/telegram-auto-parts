const slug = require("slug");

const CURRENT_DATE = new Date();

const products = {
    "Автовизитки": [
        {
            name: "Табличка для номера телефона Cartage с собачкой, черный 5265010",
            price: 270,
            description: "Описание отсутствует.",
            created_at: CURRENT_DATE,
            updated_at: CURRENT_DATE,
            image: {
                type: "jpg",
                source: "53743489_s_sobachkoy.jpg",
                created_at: CURRENT_DATE,
                updated_at: CURRENT_DATE,
            }
        },
        {
            name: "Табличка для номера телефона Cartage люминесцентные цифры, складная, серебро 5265006",
            price: 150,
            description: "Описание отсутствует.",
            created_at: CURRENT_DATE,
            updated_at: CURRENT_DATE,
            image: {
                type: "jpg",
                source: "54317507_cartage.jpg",
                created_at: CURRENT_DATE,
                updated_at: CURRENT_DATE,
            }
        },
        {
            name: "Табличка для номера телефона Cartage люминесцентные цифры, черный 5264996",
            price: 293,
            description: "Описание отсутствует.",
            created_at: CURRENT_DATE,
            updated_at: CURRENT_DATE,
            image: {
                type: "jpg",
                source: "54318061 (1).jpg",
                created_at: CURRENT_DATE,
                updated_at: CURRENT_DATE,
            }
        },
    ]
};

module.exports = products;