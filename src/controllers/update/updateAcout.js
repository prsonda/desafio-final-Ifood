const messages = require("../../services/messages");
const knex = require("../../conexion");
const bcrypt = require("bcrypt");

const updateAccount = async (req, res) => {
  const { nome, email, senha } = req.body;
  const id = req.user;

  try {
    const userExist = await knex("users").where("email", email).first();
    const userEmail = await knex
      .select("email")
      .from("users")
      .where("id", id)
      .andWhere("email", email)
      .first();

    if (userEmail) {
    } else if (userExist) {
      return res.status(400).json({
        mensagem: messages.duplicateEmail,
      });
    }

    const passwordHash = await bcrypt.hash(senha, 10);

    await knex("users")
      .update({
        name: nome,
        email,
        password: passwordHash,
      })
      .where("id", id);

    return res.status(204).json();
  } catch (error) {
    console.log(error);
    return res.status(500).json(messages.error);
  }
};

module.exports = updateAccount;
