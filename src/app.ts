import express, { Request, Response } from "express";
import { productsRoute } from "./app/modules/products/product.route";
import { orderRoute } from "./app/modules/order/order.routes";

const app = express();

app.use(express.json());

// For product
app.use("/api/products", productsRoute);

// For order
app.use("/api/orders", orderRoute);

app.get("/", (req: Request, res: Response) => {
  res.send("welcome to ecomerce project");
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

export default app;
