const Joi = require("joi");
const messages = require("../messages");

const schemaCreateOrder = Joi.object({
    cliente_id: Joi.number()
        .integer()
        .min(1)
        .required()
        .messages({
            "any.required": messages.emptyField("id do cliente"),
            "number.min": messages.minField("id da cliente", 1),
        }),
    observacao: Joi.string()
        .allow("")
        .messages({
            "string.empty": messages.emptyField("observação"),
            "any.required": messages.emptyField("observação"),
            "string.base": messages.isString("observação"),
        }),
    pedido_produtos: Joi.array().items(
        Joi.object({
            produto_id: Joi.number()
                .integer()
                .min(1)
                .required()
                .messages({
                    "any.required": messages.emptyField("id do produto"),
                    "number.min": messages.minField("id do produto", 1),
                }),
            quantidade_produto: Joi.number()
                .integer()
                .min(1)
                .required()
                .messages({
                    "any.required": messages.emptyField("quantidade de produto"),
                    "number.min": messages.minField("quantidade de produto", 1),
                }),
        })
    ).required().messages({
        "any.required": messages.emptyField("id do produto e o campo quantidade de produto"),
        "array.base": messages.arrayValid("pedido de produtos"),
    }),

});

module.exports = schemaCreateOrder;

