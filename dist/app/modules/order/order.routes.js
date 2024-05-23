"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRoute = void 0;
const express_1 = __importDefault(require("express"));
const order_controller_1 = require("./order.controller");
const router = express_1.default.Router();
// Creating a new order and manage inventory
router.post("/", order_controller_1.orderController.createNewOrder);
// Retriving all orders and search a specific order
router.get("/", order_controller_1.orderController.retriveOrders);
exports.orderRoute = router;
