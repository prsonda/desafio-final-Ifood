const express = require("express");
const cors = require("cors");
const route = require("./router");

const app = express();

app.use(cors());
app.use(express.json());

app.use(route);

module.exports = app;
