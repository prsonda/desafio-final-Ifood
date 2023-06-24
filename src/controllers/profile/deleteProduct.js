const messages = require("../../services/messages");
const knex = require("../../conexion");
const { deleteFile } = require("../../services/storage");

const deleteProduct = async (req, res) => {
    const productId = req.params.id;
    try {
        const productIdExist = await knex("products").where("id", productId).first();
        if (!productIdExist) {
            return res.status(400).json({
                mensagem: messages.errorProductId,
            });
        }

        // Verificar se o produto está associado a pedidos
        const productExistInRequests = await knex("request_products")
            .where("products_id", productId)
            .first();

        if (productExistInRequests) {
            return res.status(400).json({
                mensagem: messages.productInRequest,
            });
        }

        await knex("products")
            .where("id", productId)
            .delete();

        //Excluir no BackBlaze e no banco de dados
        if (productIdExist.image_id) {
            const imageExist = await knex("images").where("id", productIdExist.image_id).first();
            await deleteFile(imageExist.name_new)
            await knex("images")
                .where("id", productIdExist.image_id)
                .delete()
        }
        return res.status(204).json({ mensagem: messages.productDelete });

    } catch (error) {
        return res.status(500).json({ mensagem: messages.error });
    }
};

module.exports = deleteProduct;
