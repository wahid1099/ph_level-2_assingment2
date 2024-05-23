import { Request, Response } from "express";
import { Order } from "./order.interface";
import { orderService } from "./order.service";
import orderValidationSchema from "./order.validation";

// Create a new order and manage inventory
const createNewOrder = async (req: Request, res: Response) => {
  try {
    const orderData: Order = req.body;
    const zodOrderValidation = orderValidationSchema.parse(orderData);
    const result = await orderService.createNewOrderIntoDB(zodOrderValidation);
    res.status(200).json({
      success: true,
      message: "Order created successfully!",
      data: result,
    });
  } catch (error: any) {
    let errorMessage = "Something went wrong";
    if (error.message === "Product not found") {
      errorMessage = "Product not found";
    } else if (
      error.message === "Insufficient quantity available in inventory"
    ) {
      errorMessage = "Insufficient quantity available in inventory";
    }
    res.status(400).json({
      success: false,
      message: errorMessage,
    });
  }
};

// Retrieve all orders
const retriveOrders = async (req: Request, res: Response) => {
  try {
    const { email } = req.query;
    const allOrders = await orderService.retriveAllOrdersFromDB(
      email as string
    );

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
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error fetching orders",
      data: error.message,
    });
  }
};

export const orderController = {
  createNewOrder,
  retriveOrders,
};
