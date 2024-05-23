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
exports.orderController = void 0;
const order_service_1 = require("./order.service");
const order_validation_1 = __importDefault(require("./order.validation"));
// Create a new order and manage inventory
const createNewOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderData = req.body;
        const zodOrderValidation = order_validation_1.default.parse(orderData);
        const result = yield order_service_1.orderService.createNewOrderIntoDB(zodOrderValidation);
        res.status(200).json({
            success: true,
            message: "Order created successfully!",
            data: result,
        });
    }
    catch (error) {
        let errorMessage = "Something went wrong";
        if (error.message === "Product not found") {
            errorMessage = "Product not found";
        }
        else if (error.message === "Insufficient quantity available in inventory") {
            errorMessage = "Insufficient quantity available in inventory";
        }
        res.status(400).json({
            success: false,
            message: errorMessage,
        });
    }
});
// Retrieve all orders
const retriveOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.query;
        const allOrders = yield order_service_1.orderService.retriveAllOrdersFromDB(email);
        if (allOrders.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No orders found",
                data: null,
            });
        }
        res.status(200).json({
            success: true,
            message: "Orders fetched successfully!",
            data: allOrders,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching orders",
            data: error.message,
        });
    }
});
exports.orderController = {
    createNewOrder,
    retriveOrders,
};
