const messages = require("../../services/messages");
const knex = require("../../conexion");

const createCustomer = async (req, res) => {
  const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } =
    req.body;

  try {
    const emailExist = await knex
      .select("email")
      .from("clients")
      .where("email", email)
      .first();

    const cpfExist = await knex
      .select("cpf")
      .from("clients")
      .where("cpf", cpf)
      .first();

    if (emailExist) {
      return res.status(400).json({
        mensagem: messages.duplicateEmail,
      });
    }
    if (cpfExist) {
      return res.status(400).json({
        mensagem: messages.duplicateCpf,
      });
    }

    await knex("clients").insert({
      name: nome,
      email,
      cep,
      cpf,
      street: rua,
      number: numero,
      district: bairro,
      city: cidade,
      state: estado,
    });

    return res.status(201).json({ mensagem: messages.customerCreated });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ mensagem: messages.errorCreateCustomer });
  }
};

module.exports = createCustomer;
