const Joi = require("joi");
const messages = require("../messages");
const validateCpf = require("../validateCPF");
const validateCep = require("../validateCEP");

const schemaCreateCustomer = Joi.object({
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
      "string.email": messages.emailValid,
    }),

  cpf: Joi.string()
    .custom(validateCpf)
    .required()
    .messages({
      "string.empty": messages.emptyField("cpf"),
      "any.required": messages.emptyField("cpf"),
      "string.base": messages.isString("cpf"),
      "any.invalid": messages.isInvalid("cpf"),
      "any.custom": messages.isInvalid("cpf"),
    }),

  cep: Joi.string()
    .custom(validateCep)
    .allow("")
    .messages({
      "string.empty": messages.emptyField("cep"),
      "any.required": messages.emptyField("cep"),
      "string.base": messages.isString("cep"),
      "any.invalid": messages.isInvalid("cep"),
    }),
  rua: Joi.string()
    .allow("")
    .messages({
      "string.empty": messages.emptyField("rua"),
      "any.required": messages.emptyField("rua"),
      "string.base": messages.isString("rua"),
    }),
  numero: Joi.string()
    .allow("")
    .messages({
      "string.empty": messages.emptyField("número"),
      "any.required": messages.emptyField("número"),
      "string.base": messages.isString("número"),
    }),
  bairro: Joi.string()
    .allow("")
    .messages({
      "string.empty": messages.emptyField("bairro"),
      "any.required": messages.emptyField("bairro"),
      "string.base": messages.isString("bairro"),
    }),
  cidade: Joi.string()
    .allow("")
    .messages({
      "string.empty": messages.emptyField("cidade"),
      "any.required": messages.emptyField("cidade"),
      "string.base": messages.isString("cidade"),
    }),
  estado: Joi.string()
    .allow("")
    .messages({
      "string.empty": messages.emptyField("estado"),
      "any.required": messages.emptyField("estado"),
      "string.base": messages.isString("estado"),
    }),
});

module.exports = schemaCreateCustomer;
