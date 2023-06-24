const Joi = require("joi");
const messages = require("../messages");


const schemaCreateProducts = Joi.object({
  descricao: Joi.string()
    .required()
    .messages({
      "string.empty": messages.emptyField("descrição"),
    }),
  quantidade_estoque: Joi.number()
    .integer()
    .min(1)
    .required()
    .messages({
      "any.required": messages.emptyField("quantidade em estoque"),
      "number.min": messages.minField("quantidade em estoque", 1),
    }),
  valor: Joi.number()
    .min(0)
    .required()
    .messages({
      "any.required": messages.emptyField("valor"),
      "number.min": messages.minField("valor", 0),
    }),
  categoria_id: Joi.number()
    .integer()
    .min(1)
    .required()
    .messages({
      "any.required": messages.emptyField("id da categoria"),
      "number.min": messages.minField("id da categoria", 1),
    }),
  produto_imagem: Joi.string()
    .allow(null)
    .messages({
      "string.empty": messages.emptyField("produto imagem"),
    }),
});

module.exports = schemaCreateProducts;
