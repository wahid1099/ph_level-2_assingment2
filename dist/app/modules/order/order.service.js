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
exports.orderService = void 0;
const mongoose_1 = require("mongoose");
const product_model_1 = require("../products/product.model");
const order_model_1 = require("./order.model");
// Create a new order and manage the inventory
const createNewOrderIntoDB = (order) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check if the product exists
        const product = yield product_model_1.ProductModel.findById(order.productId);
        if (!product) {
            throw new mongoose_1.Error("Product not found");
        }
        // Check if the quantity available in inventory is sufficient
        if (product.inventory.quantity < order.quantity) {
            throw new mongoose_1.Error("Insufficient quantity available in inventory");
        }
        // Update inventory quantity
        const reduceInventory = product.inventory.quantity - order.quantity;
        yield product_model_1.ProductModel.findByIdAndUpdate(order.productId, {
            "inventory.quantity": reduceInventory,
        });
        // Update inStock status if necessary
        if (reduceInventory === 0) {
            yield product_model_1.ProductModel.findByIdAndUpdate(order.productId, {
                "inventory.inStock": false,
            });
        }
        // Create the new order
        const newOrder = yield order_model_1.OrderModel.create(order);
        return newOrder;
    }
    catch (err) {
        console.error(err);
        throw err; // Rethrow the error for handling in the controller
    }
});
// Retrieve all orders and search by email from DB
const retriveAllOrdersFromDB = (emailQuery) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let query = {};
        if (emailQuery) {
            query.email = { $regex: emailQuery, $options: "i" };
        }
        const allOrders = yield order_model_1.OrderModel.find(query);
        return allOrders;
    }
    catch (error) {
        throw new mongoose_1.Error("Error retrieving orders from the database");
    }
});
exports.orderService = {
    createNewOrderIntoDB,
    retriveAllOrdersFromDB,
};
