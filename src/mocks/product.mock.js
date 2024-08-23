import { fakerES as faker } from "@faker-js/faker";
import { productModel } from "../persistences/mongo/models/product.model.js"; 

export const generateProductsMocks = (amount) => {
    const products = [];

    for (let i = 0; i < amount; i++) {
        const product = {
            title: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            price: parseFloat(faker.commerce.price()),
            thumbnail: [faker.image.url(), faker.image.url()],
            code: faker.string.alphanumeric(6).toUpperCase(),
            stock: faker.number.int({ min: 0, max: 500 }),
            status: faker.datatype.boolean(),
            category: faker.commerce.department(),
        };

        //Se pushea el producto creado
        products.push(product);
    };

    productModel.insertMany(products);

    //Retorna el array de los productos creados
    return products;
};
