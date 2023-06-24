const messages = require("../../services/messages");
const knex = require("../../conexion");

const productProfile = async (req, res) => {
    const productId = req.params.id;

    try {
        const productIdExist = await knex("products").where("id", productId).first();

        if (!productIdExist) {
            return res.status(400).json({
                mensagem: messages.errorProductId,
            });
        }

        return res.json(productIdExist);

    } catch (error) {
        return res.status(500).json({ mensagem: messages.error });
    }
};


module.exports = productProfile;
