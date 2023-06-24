const { cpf } = require("cpf-cnpj-validator");
const messages = require("../services/messages");

const validateCpf = (cpfNumber, helpers) => {

  

  const numbersCpfCnpj = cpfNumber.toString().replace(/[^0-9]+/g, "");

  try {
    if (numbersCpfCnpj.length === 11) {
      if (!cpf.isValid(numbersCpfCnpj)){

        return helpers.message(messages.cpfInvalid);
        }} else {

      return helpers.message(messages.cpfSize);
    }
  } catch (error) {
    return helpers.error("CPF");
  }
};

module.exports = validateCpf;
;