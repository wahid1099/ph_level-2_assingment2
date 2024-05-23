import { z } from "zod";

const orderValidationSchema = z.object({
  email: z
    .string({
      invalid_type_error: "Email is invalid it must be a string type",
      required_error: "Email is must be required",
    })
    .email(),
  productId: z.string({
    invalid_type_error: "ProductId is invalid it must be a string type",
    required_error: "ProductId is must be required",
  }),
  price: z.number({
    invalid_type_error: "Price is invalid it must be a number type",
    required_error: "Price is must be required",
  }),
  quantity: z.number({
    invalid_type_error: "Quantity is invalid it must be a number type",
    required_error: "Quantity is must be required",
  }),
});

export default orderValidationSchema;
