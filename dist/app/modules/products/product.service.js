"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productService = void 0;
const product_model_1 = require("./product.model");
// Creating a new Product
const createNewProductIntoDB = (product) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.ProductModel.create(product);
    return result;
});
const retrieveProductsFromDB = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (searchQuery = null, productId = null) {
    let query = {};
    // If productId is provided, search by productId
    if (productId) {
        query = { _id: productId };
    }
    else if (searchQuery) {
        // If searchQuery is provided, search by searchTerm
        query = {
            $or: [
                { name: { $regex: searchQuery, $options: "i" } },
                { description: { $regex: searchQuery, $options: "i" } },
            ],
        };
    }
    return yield product_model_1.ProductModel.find(query);
});
// Updating a single product
const updateSingleProductIntoDB = (id, updatedInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedProduct = yield product_model_1.ProductModel.findOneAndUpdate({ _id: id }, { $set: updatedInfo });
    return updatedProduct;
});
// Deleting a single product
const deleteSingleProductIntoDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deleteAbleProduct = yield product_model_1.ProductModel.deleteOne({ _id: id });
    return deleteAbleProduct;
});
exports.productService = {
    createNewProductIntoDB,
    retrieveProductsFromDB,
    updateSingleProductIntoDB,
    deleteSingleProductIntoDB,
};
