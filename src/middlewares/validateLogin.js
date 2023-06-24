const messages = require("../services/messages");
const knex = require("../conexion");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const passwordJWT = process.env.PASSWORDJWT;

const validateUserLogin = async (req, res, next) => {
  const { authorization } = req.headers;

  try {
    if (!authorization) {
      return res.status(401).json({ mensagem: messages.authorization });
    }

    const token = authorization.split(" ")[1];

    if (!token) {
      return res.status(401).json({ mensagem: messages.authorization });
    }

    const { id } = jwt.verify(token, passwordJWT);

    const { rowCount } = await knex("users").where("id", id).count();

    if (rowCount < 1) {
      return res.status(401).json({ mensagem: messages.authorization });
    }

    req.user = id;

    next();
  } catch (error) {
    return res.status(500).json({ mensagem: messages.errorValidateUser });
  }
};

module.exports = validateUserLogin;
