const messages = require("../../services/messages");
const knex = require("../../conexion");

const updateCustomer = async (req, res) => {
  const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } =
    req.body;
  const id = req.params.id;

  try {
    const userExist = await knex
      .select("id")
      .from("clients")
      .where("id", id)
      .first();

    if (!userExist) {
      return res.status(400).json({
        mensagem: messages.errorCustomer,
      });
    }

    const customerEmail = await knex
      .select("email")
      .from("clients")
      .where("id", id)
      .andWhere("email", email)
      .first();

    const existEmail = await knex
      .select("id")
      .from("clients")
      .where("email", email)
      .first();

    if (customerEmail) {
      if (existEmail.id == id) {
      }
    } else if (existEmail) {
      return res.status(400).json({
        mensagem: messages.duplicateEmail,
      });
    }

    const cpfcustomer = await knex
      .select("cpf")
      .from("clients")
      .where("cpf", cpf)
      .andWhere("id", id)
      .first();

    const cpfExist = await knex
      .select("id")
      .from("clients")
      .where("cpf", cpf)
      .first();

    if (cpfcustomer) {
      if (cpfExist.id == id) {
      }
    } else if (cpfExist) {
      return res.status(400).json({
        mensagem: messages.duplicateCpf,
      });
    }

    await knex("clients")
      .update({
        name: nome,
        email,
        cep,
        cpf,
        street: rua,
        number: numero,
        district: bairro,
        city: cidade,
        state: estado,
      })
      .where("id", id);

    return res.status(204).json();
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(messages.error);
  }
};

module.exports = updateCustomer;
