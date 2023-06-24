const knex = require("../../conexion");
const messages = require("../../services/messages");

const groupCategories = async (req, res) => {
  try {
    const categorias = await knex
      .select("id", "description as descricao")
      .from("categories");

    return res.json(categorias);
  } catch (error) {
    return res.status(500).json({ mensagem: messages.errorGroupCategories });
  }
};

module.exports = groupCategories;
