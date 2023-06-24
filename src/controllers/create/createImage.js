const messages = require("../../services/messages");
const knex = require("../../conexion");
require("dotenv").config();
const { uploadFile } = require("../../services/storage");

const createImage = async (req, res) => {

    const { imagem } = req.body
    if (imagem) {
        const buff = Buffer.from(imagem, 'base64')
        const time = new Date()
        const originalname = 'imagem' + time.getTime()
        const mimetype = 'image/jpeg'

        try {
            //BACKBLAZE
            const arquivo = await uploadFile(
                originalname,
                buff,
                mimetype
            )
            //POSTGRESS
            await knex("images").insert({
                name_new: arquivo.path,
                url: arquivo.url
            });

            return res.status(201).json(arquivo.url)

        } catch (error) {
            console.log(error)
            return res.status(500).json({ mensagem: 'Erro Interno do servidor' })
        }
    } else {
        return res.status(404).json({ mensagem: messages.imageNoInformed })
    }
};

module.exports = createImage;