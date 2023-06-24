const messages = require("../../services/messages");
const knex = require("../../conexion");

const groupCustomers = async (req, res) => {
    try {

        const clientsExist = await knex("clients").select("*").first();

        if (!clientsExist) {
            return res.status(404).json({
                mensagem: messages.noRegisteredCustomer,
            });
        }

        const customers = await knex("clients")
            .select("*")

        return res.status(200).json(customers);

    } catch (error) {
        console.info(error.message);

        return res.status(500).json({ mensagem: messages.errorGetAllCustomers });
    }
};

module.exports = groupCustomers;