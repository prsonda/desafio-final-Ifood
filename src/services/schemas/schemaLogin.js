const messages = require("../messages");

const Joi = require("joi");

const schemaLogin = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      "string.empty": messages.emptyField("email"),
      "any.required": messages.emptyField("email"),
      "string.base": messages.isString("email"),
    }),
  senha: Joi.string()
    .required()
    .messages({
      "string.empty": messages.emptyField("senha"),
      "any.required": messages.emptyField("senha"),
      "string.base": messages.isString("senha"),
    }),
});

module.exports = schemaLogin;
