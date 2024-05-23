import { Error } from "mongoose";
import { ProductModel } from "../products/product.model";
import { productService } from "../products/product.service";
import { Order } from "./order.interface";
import { OrderModel } from "./order.model";

// Create a new order and manage the inventory
const createNewOrderIntoDB = async (order: Order) => {
  try {
    // Check if the product exists
    const product = await ProductModel.findById(order.productId);
    if (!product) {
      throw new Error("Product not found");
    }

    // Check if the quantity available in inventory is sufficient
    if (product.inventory.quantity < order.quantity) {
      throw new Error("Insufficient quantity available in inventory");
    }

    // Update inventory quantity
    const reduceInventory = product.inventory.quantity - order.quantity;
    await ProductModel.findByIdAndUpdate(order.productId, {
      "inventory.quantity": reduceInventory,
    });

    // Update inStock status if necessary
    if (reduceInventory === 0) {
      await ProductModel.findByIdAndUpdate(order.productId, {
        "inventory.inStock": false,
      });
    }

    // Create the new order
    const newOrder = await OrderModel.create(order);
    return newOrder;
  } catch (err) {
    console.error(err);
    throw err; // Rethrow the error for handling in the controller
  }
};

// Retrieve all orders and search by email from DB
const retriveAllOrdersFromDB = async (emailQuery: unknown) => {
  try {
    let query: any = {};
    if (emailQuery) {
      query.email = { $regex: emailQuery, $options: "i" };
    }
    const allOrders = await OrderModel.find(query);
    return allOrders;
  } catch (error) {
    throw new Error("Error retrieving orders from the database");
  }
};

export const orderService = {
  createNewOrderIntoDB,
  retriveAllOrdersFromDB,
};
