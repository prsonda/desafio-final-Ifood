const instanceViacep = require("./instanceAxios");

const validateCep = async (value, helpers) => {
  const cep = value.toString().replace(/[^0-9]+/g, "");

  try {
    if (cep.length !== 8) {
      return helpers.error("CEP");
    }

    const validateCEP = await instanceViacep.get(`${cep}/json/`);

    if (validateCEP.data.erro) {
      return helpers.error("CEP");
    }
  } catch (error) {
    return helpers.error("CEP");
  }
};

module.exports = validateCep;
