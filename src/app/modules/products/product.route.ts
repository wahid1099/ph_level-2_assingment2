import express from "express";
import { productsController } from "./product.controller";

const router = express.Router();

// Create new product
router.post("/", productsController.createNewProduct);

// Retrieve products by productId or searchTerm
router.get("/", productsController.retrieveProducts);

// Retrieve a single product
router.get("/:productId", productsController.retrieveProducts);

// Update a single product
router.put("/:productId", productsController.updateSingleProduct);

// Delete a single product
router.delete("/:productId", productsController.deleteProduct);

export const productsRoute = router;
