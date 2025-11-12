import Joi from "joi";

export const createCategory = Joi.object({
  name: Joi.string()
    .required()
    .messages({
      "string.base": "Name must be a string",
      "string.empty": "Name is required",
      "any.required": "Name is required",
    }),
});

export const updateCategory = Joi.object({
  name: Joi.string()
    .optional()
    .min(1)
    .messages({
      "string.base": "Name must be a string",
      "string.empty": "Name is required",
    }),
});