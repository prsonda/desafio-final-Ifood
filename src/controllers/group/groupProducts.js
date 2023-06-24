const knex = require("../../conexion");
const messages = require("../../services/messages");

const groupProducts = async (req, res) => {
  try {
    const { categoria_id } = req.query;

    if (categoria_id) {
      const categoryExist = await knex("categories")
        .where("id", categoria_id)
        .first();

      if (categoryExist) {
        const products = await knex("products").where(
          "category_id",
          categoria_id
        );

        return res.status(200).json(products);
      } else {
        return res.status(404).json({ mensagem: messages.errorSelectCategory });
      }
    } else {
      const products = await knex("products").select("*");
      return res.status(200).json(products);
    }
  } catch (error) {
    console.info(error.message);

    return res.status(500).json({ mensagem: messages.errorGetAllProducts });
  }
};

module.exports = groupProducts;
