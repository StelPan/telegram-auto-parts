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
    ],
    "Автогамаки": [
        {
            name: "Гамак для перевозки собак в багажнике AvtoTink 73005",
            price: 1185,
            description: "Гамак для перевозки собак в багажнике AvtoTink 73005 позволяет удобно перевезти питомца, предохраняя обивку багажника от грязи и повреждений. Изделие имеет универсальную конструкцию, подходит для большинства автомобилей. Гамак изготовлен из морозо- и влагоустойчивой ткани Oxford 600D, обладает высокой прочностью. Легко очищается при помощи щетки или влажной тряпки. Габариты гамака позволяют защитить задний бампер автомобиля от царапин в момент запрыгивания питомца.",
            created_at: CURRENT_DATE,
            updated_at: CURRENT_DATE,
            image: {
                type: "jpg",
                source: "gamak-dog.jpg",
                created_at: CURRENT_DATE,
                updated_at: CURRENT_DATE,
            }
        },
    ],
    "Автомобильные держатели": [
        {
            name: "Держатель для телефона/смартфона на лобовое стекло Carline на короткой штанге mg3-pb",
            price: 485,
            description: "Тип: для смарфонов. Min расстояние зажимов, мм: 40. Max расстояние зажимов, мм: 115. Цвет: черный.",
            created_at: CURRENT_DATE,
            updated_at: CURRENT_DATE,
            image: {
                type: "jpg",
                source: "derjatel.jpg",
                created_at: CURRENT_DATE,
                updated_at: CURRENT_DATE,
            }
        },
    ],
    "Автомобильные пылесосы": [
        {
            name: "Бесщеточный пылесос Ryobi ONE+ R18SV7-0 5133004487",
            price: 19853,
            description: "Теперь, чтобы убираться в доме, не нужны розетки. Пылесос RYOBI из линейки ONE+ питается от аккумулятора RB18L50 на 18 В, который позволяет непрерывно работать до 43 мин. Эффективный бесщеточный двигатель обеспечивает силу всасывания до 95 Вт и пропускает воздушный поток со скоростью 1160 л/мин. Используйте пылесос не только для уборки, но и для чистки автомобильных ковриков и обивки мебели.",
            created_at: CURRENT_DATE,
            updated_at: CURRENT_DATE,
            image: {
                type: "jpg",
                source: "pilesos.jpg",
                created_at: CURRENT_DATE,
                updated_at: CURRENT_DATE,
            }
        },
    ]
};

module.exports = products;