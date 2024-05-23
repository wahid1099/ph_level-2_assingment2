import express from "express";
import { orderController } from "./order.controller";

const router = express.Router();

// Creating a new order and manage inventory
router.post("/", orderController.createNewOrder);

// Retriving all orders and search a specific order
router.get("/", orderController.retriveOrders);

export const orderRoute = router;
