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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productsController = void 0;
const product_service_1 = require("./product.service");
const product_validation_1 = __importDefault(require("./product.validation"));
// Create a new product
const createNewProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newProduct = req.body;
        const zodValidationParse = product_validation_1.default.parse(newProduct);
        const result = yield product_service_1.productService.createNewProductIntoDB(zodValidationParse);
        res.status(200).json({
            success: true,
            message: "Product created successfully!",
            data: result,
        });
    }
    catch (error) {
        res.status(200).json({
            success: false,
            message: "Something went wrong",
            data: error,
        });
    }
});
const retrieveProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const searchQuery = req.query.searchTerm;
        let result;
        if (productId) {
            // If productId is provided, search by productId
            result = yield product_service_1.productService.retrieveProductsFromDB(null, productId);
        }
        else {
            // If searchQuery is provided, search by searchTerm
            // If neither productId nor searchQuery is provided, return all products
            result = yield product_service_1.productService.retrieveProductsFromDB(searchQuery || null);
        }
        if (!result) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
                data: null,
            });
        }
        let successMessage;
        if (productId) {
            successMessage = "Product fetched successfully!";
        }
        else if (searchQuery) {
            successMessage = `Products matching search term '${searchQuery}' fetched successfully!`;
        }
        else {
            successMessage = "Products fetched successfully!";
        }
        res.status(200).json({
            success: true,
            message: successMessage,
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            data: error,
        });
    }
});
// Update a single product
const updateSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const updatedInfo = req.body;
        const zodValidationForUpdate = product_validation_1.default.parse(updatedInfo);
        const updateProduct = yield product_service_1.productService.updateSingleProductIntoDB(productId, zodValidationForUpdate);
        res.status(200).json({
            success: true,
            message: "Product updated successfully!",
            data: updateProduct,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong!!",
            data: error,
        });
    }
});
// Delete a single product
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        yield product_service_1.productService.deleteSingleProductIntoDB(productId);
        res.status(200).json({
            success: true,
            message: "Product deleted successfully!",
            data: null,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong!!",
            data: error,
        });
    }
});
exports.productsController = {
    createNewProduct,
    retrieveProducts,
    updateSingleProduct,
    deleteProduct,
};
