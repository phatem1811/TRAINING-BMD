import Joi from "joi";

export const createProduct = Joi.object({
  name: Joi.string()
    .required()
    .messages({
      "string.base": "Name must be a string",
      "string.empty": "Name is required",
      "any.required": "Name is required",
    }),

  price: Joi.number()
    .required()
    .messages({
      "number.base": "Price must be a number",
      "any.required": "Price is required",
    }),

  image: Joi.string().optional().messages({
    "string.base": "Image must be a string",
  }),

  description: Joi.string().optional().messages({
    "string.base": "Description must be a string",
  }),

  categoryId: Joi.number()
    .required()
    .messages({
      "number.base": "CategoryId must be a number",
      "any.required": "CategoryId is required",
    }),
});

export const updateProduct = Joi.object({
  name: Joi.string()
    .optional()
    .min(1)
    .messages({
      "string.base": "Name must be a string",
      "string.empty": "Name cannot be empty",
    }),

  price: Joi.number()
    .optional()
    .messages({
      "number.base": "Price must be a number",
    }),

  image: Joi.string()
    .optional()
    .messages({
      "string.base": "Image must be a string",
    }),

  description: Joi.string()
    .optional()
    .messages({
      "string.base": "Description must be a string",
    }),

  categoryId: Joi.number()
    .optional()
    .messages({
      "number.base": "CategoryId must be a number",
    }),
});