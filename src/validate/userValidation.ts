import Joi from "joi";

export const createUser = Joi.object({
  username: Joi.string()
    .required()
    .messages({
      "string.base": "Username must be a string",
      "string.empty": "Username is required",
      "any.required": "Username is required",
    }),

  password: Joi.string()
    .min(6)
    .required()
    .messages({
      "string.base": "Password must be a string",
      "string.empty": "Password is required",
      "string.min": "Password must be at least 6 characters",
      "any.required": "Password is required",
    }),

  fullName: Joi.string()
    .optional()
    .messages({
      "string.base": "Full name must be a string",
    }),

  phone: Joi.string()
    .optional()
    .messages({
      "string.base": "Phone must be a string",
    }),

  email: Joi.string()
    .email({ tlds: { allow: false } })
    .optional()
    .messages({
      "string.email": "Email must be valid",
    }),
});
