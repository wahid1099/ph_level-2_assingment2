"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
// Schema validation for variants
const VariantValidationSchema = zod_1.z.object({
    type: zod_1.z.string(),
    value: zod_1.z.string(),
});
// Schema validation for inventory
const InventoryValidationSchema = zod_1.z.object({
    quantity: zod_1.z.number(),
    inStock: zod_1.z.boolean(),
});
// Schema validation for product
const ProductValidationSchema = zod_1.z.object({
    name: zod_1.z
        .string({
        invalid_type_error: "Name is invalid it must be a string",
        required_error: "Name is must be required",
    })
        .min(3, { message: "Name must not be empty" }),
    description: zod_1.z.string({
        invalid_type_error: "Description is invalid it must be a string",
        required_error: "Description is must be required",
    }),
    price: zod_1.z.number({
        invalid_type_error: "Price is invalid it must be a number type",
        required_error: "Price is must be required",
    }),
    category: zod_1.z.string({
        invalid_type_error: "Category is invalid it must be a string",
        required_error: "Category is must be required",
    }),
    tags: zod_1.z.array(zod_1.z.string({
        invalid_type_error: "Tags is invalid type",
        required_error: "Tags is must be required",
    })),
    variants: zod_1.z.array(VariantValidationSchema),
    inventory: InventoryValidationSchema,
});
exports.default = ProductValidationSchema;
