const knex = require("../../conexion");
const messages = require("../../services/messages");

const userProfile = async (req, res) => {
  try {
    const id = req.user;

    const informationUser = await knex("users")
      .where("id", id)
      .select("id", "name", "email")
      .first();

    return res.status(200).json(informationUser);
  } catch (error) {
    console.info(error.message);

    return res.status(500).json({ mensagem: messages.authorization });
  }
};

module.exports = userProfile;
