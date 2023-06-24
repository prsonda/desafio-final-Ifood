const jwt = require("jsonwebtoken");
const passwordJWT = process.env.PASSWORDJWT;
const bcrypt = require("bcrypt");
const knex = require("../conexion");
const messages = require("../services/messages");

const userLogin = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const userExist = await knex("users").where("email", email).first();

    if (!userExist) {
      return res.status(400).json({
        mensagem: messages.login,
      });
    }

    const { password: passwordUser, ...userData } = userExist;

    const validatePassword = await bcrypt.compare(senha, passwordUser);

    if (!validatePassword) {
      return res.status(401).json({ mensagem: messages.login });
    }

    const tokenUser = jwt.sign({ id: userData.id }, passwordJWT, {
      expiresIn: "8h",
    });

    return res.json({
      user: userData.id,
      tokenUser,
    });
  } catch (error) {
    return res.status(500).json({ mensagem: messages.errorLogin });
  }
};

module.exports = userLogin;
