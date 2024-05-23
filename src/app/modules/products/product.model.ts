import mongoose, { Schema, model } from "mongoose";
import { Product, ProductVariant, Inventory } from "./product.interface";

const ProductVariantSchema = new Schema<ProductVariant>(
  {
    type: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const InventorySchema = new Schema<Inventory>(
  {
    quantity: {
      type: Number,
      required: true,
    },
    inStock: {
      type: Boolean,
      required: true,
    },
  },
  { _id: false }
);

const ProductSchema = new Schema<Product>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    required: true,
  },
  variants: {
    type: [ProductVariantSchema],
    required: true,
  },
  inventory: {
    type: InventorySchema,
    required: true,
  },
});

export const ProductModel = model<Product>(
  "Product",
  ProductSchema,
  "products"
);
