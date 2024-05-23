import { z } from "zod";

// Schema validation for variants
const VariantValidationSchema = z.object({
  type: z.string(),
  value: z.string(),
});

// Schema validation for inventory
const InventoryValidationSchema = z.object({
  quantity: z.number(),
  inStock: z.boolean(),
});

// Schema validation for product
const ProductValidationSchema = z.object({
  name: z
    .string({
      invalid_type_error: "Name is invalid it must be a string",
      required_error: "Name is must be required",
    })
    .min(3, { message: "Name must not be empty" }),
  description: z.string({
    invalid_type_error: "Description is invalid it must be a string",
    required_error: "Description is must be required",
  }),
  price: z.number({
    invalid_type_error: "Price is invalid it must be a number type",
    required_error: "Price is must be required",
  }),
  category: z.string({
    invalid_type_error: "Category is invalid it must be a string",
    required_error: "Category is must be required",
  }),
  tags: z.array(
    z.string({
      invalid_type_error: "Tags is invalid type",
      required_error: "Tags is must be required",
    })
  ),
  variants: z.array(VariantValidationSchema),
  inventory: InventoryValidationSchema,
});

export default ProductValidationSchema;
