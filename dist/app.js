"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_route_1 = require("./app/modules/products/product.route");
const order_routes_1 = require("./app/modules/order/order.routes");
const app = (0, express_1.default)();
app.use(express_1.default.json());
// For product
app.use("/api/products", product_route_1.productsRoute);
// For order
app.use("/api/orders", order_routes_1.orderRoute);
app.get("/", (req, res) => {
    res.send("welcome to ecomerce project");
});
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
    });
});
exports.default = app;
