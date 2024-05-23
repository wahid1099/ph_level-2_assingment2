"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productsRoute = void 0;
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("./product.controller");
const router = express_1.default.Router();
// Create new product
router.post("/", product_controller_1.productsController.createNewProduct);
// Retrieve products by productId or searchTerm
router.get("/", product_controller_1.productsController.retrieveProducts);
// Retrieve a single product
router.get("/:productId", product_controller_1.productsController.retrieveProducts);
// Update a single product
router.put("/:productId", product_controller_1.productsController.updateSingleProduct);
// Delete a single product
router.delete("/:productId", product_controller_1.productsController.deleteProduct);
exports.productsRoute = router;
