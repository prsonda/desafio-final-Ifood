const messages = require("../../services/messages");
const knex = require("../../conexion");

const createProduct = async (req, res) => {
    const { descricao, quantidade_estoque, valor, categoria_id, produto_imagem } = req.body;
    try {
        const categoriesIdExist = await knex("categories").where("id", categoria_id).first();

        if (!categoriesIdExist) {
            return res.status(400).json({
                mensagem: messages.errorCategoriesId,
            });
        }
        await knex("products").insert({
            description: descricao,
            quantity_stock: quantidade_estoque,
            value: valor,
            category_id: categoria_id
        });

        if (produto_imagem) {   //Aprimoramento

            const local_product = await knex.select("id").from("products").orderBy('id', 'desc').first();
            const local_image = await knex.select("id").from("images").where("url", produto_imagem).first()/*.orderBy('id', 'desc').first()*/;
            if (!local_image) {
                return res.status(404).json({ mensagem: messages.imageNoLocalized });
            }
            await knex("products")
                .update({ image_id: local_image.id })
                .where(
                    "id",
                    local_product.id)
        }
        return res.status(201).json({ mensagem: messages.productCreated });

    } catch (error) {
        return res.status(500).json({ mensagem: messages.error });
    }
};

module.exports = createProduct;
