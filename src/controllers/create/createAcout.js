const messages = require("../../services/messages");
const knex = require("../../conexion");
const bcrypt = require("bcrypt");

const createAccount = async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    const userExist = await knex("users").where("email", email).first();

    if (userExist) {
      return res.status(400).json({
        mensagem: messages.duplicateEmail,
      });
    }

    const passwordHash = await bcrypt.hash(senha, 10);

    await knex("users").insert({
      name: nome,
      email,
      password: passwordHash,
    });

    return res.status(201).json({ mensagem: messages.userCreated });
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({ mensagem: messages.error });
  }
};

module.exports = createAccount;
