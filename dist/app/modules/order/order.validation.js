"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const orderValidationSchema = zod_1.z.object({
    email: zod_1.z
        .string({
        invalid_type_error: "Email is invalid it must be a string type",
        required_error: "Email is must be required",
    })
        .email(),
    productId: zod_1.z.string({
        invalid_type_error: "ProductId is invalid it must be a string type",
        required_error: "ProductId is must be required",
    }),
    price: zod_1.z.number({
        invalid_type_error: "Price is invalid it must be a number type",
        required_error: "Price is must be required",
    }),
    quantity: zod_1.z.number({
        invalid_type_error: "Quantity is invalid it must be a number type",
        required_error: "Quantity is must be required",
    }),
});
exports.default = orderValidationSchema;
