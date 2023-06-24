const messages = require("../../services/messages");
const knex = require("../../conexion");

const customerProfile = async (req, res) => {

    const id = req.params.id;


    try {
        const userExist = await knex
        .select("*")
        .from("clients")
        .where("id", id)
        .first();

    if (!userExist) {
        return res.status(400).json({
          mensagem: messages.errorCustomer,
        });
      }
      
      return res.status(200).json(userExist);

    } catch (error) {
      console.log(error);
      return res.status(500).json(messages.error);
    }
};

module.exports = customerProfile;
