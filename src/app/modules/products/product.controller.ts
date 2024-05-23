import { Request, Response } from "express";
import { Product } from "./product.interface";
import { productService } from "./product.service";
import ProductValidationSchema from "./product.validation";

// Create a new product
const createNewProduct = async (req: Request, res: Response) => {
  try {
    const newProduct: Product = req.body;

    const zodValidationParse = ProductValidationSchema.parse(newProduct);

    const result =
      await productService.createNewProductIntoDB(zodValidationParse);

    res.status(200).json({
      success: true,
      message: "Product created successfully!",
      data: result,
    });
  } catch (error) {
    res.status(200).json({
      success: false,
      message: "Something went wrong",
      data: error,
    });
  }
};

const retrieveProducts = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    const searchQuery = req.query.searchTerm as string | undefined;

    let result;
    if (productId) {
      // If productId is provided, search by productId
      result = await productService.retrieveProductsFromDB(null, productId);
    } else {
      // If searchQuery is provided, search by searchTerm
      // If neither productId nor searchQuery is provided, return all products
      result = await productService.retrieveProductsFromDB(searchQuery || null);
    }

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
        data: null,
      });
    }

    let successMessage;
    if (productId) {
      successMessage = "Product fetched successfully!";
    } else if (searchQuery) {
      successMessage = `Products matching search term '${searchQuery}' fetched successfully!`;
    } else {
      successMessage = "Products fetched successfully!";
    }
    res.status(200).json({
      success: true,
      message: successMessage,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      data: error,
    });
  }
};

// Update a single product
const updateSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const updatedInfo = req.body;

    const zodValidationForUpdate = ProductValidationSchema.parse(updatedInfo);
    const updateProduct = await productService.updateSingleProductIntoDB(
      productId,
      zodValidationForUpdate
    );
    res.status(200).json({
      success: true,
      message: "Product updated successfully!",
      data: updateProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong!!",
      data: error,
    });
  }
};

// Delete a single product
const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    await productService.deleteSingleProductIntoDB(productId);
    res.status(200).json({
      success: true,
      message: "Product deleted successfully!",
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong!!",
      data: error,
    });
  }
};

export const productsController = {
  createNewProduct,
  retrieveProducts,
  updateSingleProduct,
  deleteProduct,
};
