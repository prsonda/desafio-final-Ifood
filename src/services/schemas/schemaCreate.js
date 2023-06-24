const messages = require("../messages");

const Joi = require("joi");

const schemaCreate = Joi.object({
  nome: Joi.string()
    .required()
    .messages({
      "string.empty": messages.emptyField("nome"),
      "any.required": messages.emptyField("nome"),
      "string.base": messages.isString("nome"),
    }),
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

module.exports = schemaCreate;
