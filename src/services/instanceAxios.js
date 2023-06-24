const axios = require("axios");

const instanceViacep = axios.create({
  baseURL: "https://viacep.com.br/ws/",
});

module.exports = instanceViacep;
