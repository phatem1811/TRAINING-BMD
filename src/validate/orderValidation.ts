import Joi from "joi";

export const createOrder = Joi.object({
  address: Joi.string().min(3).max(255).required().messages({
    "string.base": "Address must be a string",
    "string.empty": "Address cannot be empty",
    "any.required": "Address is required",
  }),
  note: Joi.string().allow("").max(500).messages({
    "string.base": "Note must be a string",
  }),
  paymentMethod: Joi.string()
    .valid("cod", "bank_transfer")
    .required()
    .messages({
      "any.only": "Payment method must be 'cod' or 'bank_transfer'",
      "any.required": "Payment method is required",
    }),
  items: Joi.array()
    .items(
      Joi.object({
        productId: Joi.number().integer().positive().required().messages({
          "number.base": "Product ID must be a number",
          "number.integer": "Product ID must be an integer",
          "number.positive": "Product ID must be positive",
          "any.required": "Product ID is required",
        }),
        quantity: Joi.number().integer().positive().required().messages({
          "number.base": "Quantity must be a number",
          "number.integer": "Quantity must be an integer",
          "number.positive": "Quantity must be positive",
          "any.required": "Quantity is required",
        }),
      })
    )
    .min(1)
    .required()
    .messages({
      "array.base": "Items must be an array",
      "array.min": "Items cannot be empty",
      "any.required": "Items are required",
    }),
});
