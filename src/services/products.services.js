import { productResponseDto } from "../dto/product-response.dto.js";
import productRepository from "../persistences/mongo/repositories/products.repository.js";
import error from "../errors/customErrors.js";

const getAllProducts = async (query, options) => {
    const products = await productRepository.getAllProducts(query, options);
    return products;
};

const getProductById = async (id) => {
    const productData = await productRepository.getProductById(id);

    //Si no viene el productData, a través del throw mando el error y cae en el catch del controlador
    if (!productData) throw error.notFoundError(`Product ID ${id} not found`);
    const product = productResponseDto(productData);
    return product;
};

const createProduct = async (data) => {
    const product = await productRepository.createProduct(data);
    return product;
};

const updateProduct = async (id, data) => {
    const product = await productRepository.updateProduct(id, data);
    if (!product) throw error.notFoundError(`Product ID ${id} not found`);
        
    return product;
};

const deleteProduct = async (id) => {
    const product = await productRepository.deleteProduct(id);
    if (!product) throw error.notFoundError(`Product ID ${id} not found`);
    
    return product;
};

export default {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};