const messages = require("../../services/messages");
const knex = require("../../conexion");
const { deleteFile } = require("../../services/storage");

const updateProduct = async (req, res) => {
    const { descricao, quantidade_estoque, valor, categoria_id, produto_imagem } = req.body;
    const productId = req.params.id;
    try {

        const productIdExist = await knex("products").where("id", productId).first();

        if (!productIdExist) {
            return res.status(400).json({
                mensagem: messages.errorProductId,
            });
        }

        const categoriesIdExist = await knex("categories").where("id", categoria_id).first();

        if (!categoriesIdExist) {
            return res.status(400).json({
                mensagem: messages.errorCategoriesId,
            });
        }

        const imageExist = await knex("images").where("url", produto_imagem).first();
        // Caso o campo `produto_imagem` não tenha uma url valida e tbm n seja null
        if (!imageExist.url) {
            return res.status(400).json({
                mensagem: messages.errorImageUrl,
            });
        }
        if (productIdExist.image_id === null) { // adicionei

            await knex("products").where("id", productId).first().update({
                description: descricao,
                quantity_stock: quantidade_estoque,
                value: valor,
                category_id: categoria_id,
                image_id: imageExist.id
            });
            return res.status(201).json({ mensagem: messages.productUpdate });
        }
        if (produto_imagem === null) {
            // Caso o campo `produto_imagem` seja null, remover a imagem vinculada
            await knex("products").where("id", productId).first().update({
                description: descricao,
                quantity_stock: quantidade_estoque,
                value: valor,
                category_id: categoria_id,
                image_id: null
            });
        } else {
            //deletar arquivo substituido no BackBlaze
            const id_old_image = await knex("products").where("id", productId).first()
            const name_old_image = await knex("images").where("id", id_old_image.image_id).first()
            deleteFile(name_old_image.name_new)

            // Caso haja uma nova imagem, substituir a imagem vinculada anteriormente
            await knex("products").where("id", productId).first().update({
                description: descricao,
                quantity_stock: quantidade_estoque,
                value: valor,
                category_id: categoria_id,
                image_id: imageExist.id
            });

            //deletar arquivo substituido no banco de dados
            await knex("images")
                .where("id", id_old_image.image_id)
                .delete()
        }

        return res.status(201).json({ mensagem: messages.productUpdate });

    } catch (error) {
        return res.status(500).json({ mensagem: messages.error });
    }
};

module.exports = updateProduct;