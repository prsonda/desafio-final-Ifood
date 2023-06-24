const messages = require("../../services/messages");
const knex = require("../../conexion");
const { listFile } = require("../../services/storage");

const groupImage = async (req, res) => {
    try {

        const files = await listFile()
        return res.status(200).json(files)

    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro Interno do servidor' })
    }
};

module.exports = groupImage;