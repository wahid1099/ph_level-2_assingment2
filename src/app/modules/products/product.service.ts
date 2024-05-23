import { Product } from "./product.interface";
import { ProductModel } from "./product.model";

// Creating a new Product
const createNewProductIntoDB = async (product: Product) => {
  const result = await ProductModel.create(product);

  return result;
};

const retrieveProductsFromDB = async (
  searchQuery: string | null = null,
  productId: string | null = null
) => {
  let query: any = {};

  // If productId is provided, search by productId
  if (productId) {
    query = { _id: productId };
  } else if (searchQuery) {
    // If searchQuery is provided, search by searchTerm
    query = {
      $or: [
        { name: { $regex: searchQuery, $options: "i" } },
        { description: { $regex: searchQuery, $options: "i" } },
      ],
    };
  }

  return await ProductModel.find(query);
};

// Updating a single product
const updateSingleProductIntoDB = async (id: string, updatedInfo: Product) => {
  const updatedProduct = await ProductModel.findOneAndUpdate(
    { _id: id },
    { $set: updatedInfo }
  );
  return updatedProduct;
};

// Deleting a single product
const deleteSingleProductIntoDB = async (id: string) => {
  const deleteAbleProduct = await ProductModel.deleteOne({ _id: id });
  return deleteAbleProduct;
};

export const productService = {
  createNewProductIntoDB,
  retrieveProductsFromDB,
  updateSingleProductIntoDB,
  deleteSingleProductIntoDB,
};
