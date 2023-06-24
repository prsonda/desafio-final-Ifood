const { Router } = require("express");
const createAccount = require("./controllers/create/createAcout");
const groupCategories = require("./controllers/group/groupCategories");
const userLogin = require("./controllers/login");
const updateAccount = require("./controllers/update/updateAcout");
const userProfile = require("./controllers/profile/userPofile");
const validateUserLogin = require("./middlewares/validateLogin");
const validateRequestField = require("./middlewares/validateRequestField");
const schemaCreate = require("./services/schemas/schemaCreate");
const schemaLogin = require("./services/schemas/schemaLogin");
const schemaCreateProducts = require("./services/schemas/schemaCreatePoducts");
const schemaCreateCustomer = require("./services/schemas/schemaCreateCustomer");
const createProduct = require("./controllers/create/createProduct");
const createCustomer = require("./controllers/create/createCustomer");
const updateProduct = require("./controllers/update/updateProduct");
const updateCustomer = require("./controllers/update/updateCustomer");
const groupProducts = require("./controllers/group/groupProducts");
const groupCustomers = require("./controllers/group/groupCustomers");
const productProfile = require("./controllers/profile/productProfile");
const customerProfile = require("./controllers/profile/customerProfile");
const deleteProduct = require("./controllers/profile/deleteProduct");
const createOrder = require("./controllers/create/createOrder");
const groupOrder = require("./controllers/group/groupOrder");
const createImage = require("./controllers/create/createImage");
const groupImage = require("./controllers/group/groupImage");
const multer = require("./multer");
//const schemaCreateImage = require("./services/schemas/schemaCreateImage");   // excluir pois esta dando erro ja que esse schema foi deletado da pasta schema

const route = Router();

route.post("/usuario", validateRequestField(schemaCreate), createAccount);

route.post("/login", validateRequestField(schemaLogin), userLogin);

route.get("/categoria", groupCategories);

route.use(validateUserLogin);

route.post(
  "/produto",
  validateRequestField(schemaCreateProducts),
  createProduct
); //aprimorando cadastro

route.post(
  "/cliente",
  validateRequestField(schemaCreateCustomer),
  createCustomer
);

route.put("/usuario", validateRequestField(schemaCreate), updateAccount);

route.put(
  "/produto/:id",
  validateRequestField(schemaCreateProducts),
  updateProduct
);

route.put(
  "/cliente/:id",
  validateRequestField(schemaCreateCustomer),
  updateCustomer
);
route.get("/usuario", userProfile);

route.get("/produto", groupProducts);

route.get("/cliente", groupCustomers);

route.get("/produto/:id", productProfile);

route.get("/cliente/:id", customerProfile);

route.delete("/produto/:id", deleteProduct);

route.post("/pedido", createOrder);

route.get("/pedido", groupOrder);

route.post("/arquivo/upload", multer.single('imagem'), createImage); //Pedro

route.get("/arquivo", groupImage); //Pedro

module.exports = route;
