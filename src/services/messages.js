module.exports = {
  emptyField: (field) => `O campo '${field}' não pode ser vazio`,
  isInvalid: (field) => `O campo '${field}' inválido`,
  isString: (field) => `O campo '${field}' deve ser uma string`,
  login: "Usuário e/ou senha inválido(s)",
  authorization: "Token de autorização inválido",
  errorLogin: "Erro ao realizar login",
  errorRegister: "Erro ao realizar cadastro",
  duplicateEmail: "Email já cadastrado",
  duplicateCpf: "CPF já cadastrado",
  errorUpdate: "Erro ao atualizar cadastro",
  errorDelete: "Erro ao deletar cadastro",
  errorGet: "Erro ao buscar cadastro",
  errorGetAll: "Erro ao buscar todos os cadastros",
  errorValidateUser: "Erro ao validar usuário",
  userCreated: "Usuário cadastrado com sucesso",
  customerCreated: "Cliente cadastrado com sucesso",
  errorCustomer: "Cliente não localizado",
  errorGroupCategories: "Erro ao listar categorias",
  errorSelectCategory: "A categoria informada não existe",
  errorCreateProduct: "Erro ao cadastrar produto",
  productCreated: "Produto cadastrado com sucesso",
  productDelete: "Produto deletado com sucesso",
  errorProductId: "O id do produto não existe",
  productUpdate: "Produto atualizado com sucesso",
  errorCategoriesId: "O id da categoria informada não existe",
  errorUpdateProduct: "Erro ao atualizar produto",
  errorDeleteProduct: "Erro ao deletar produto",
  errorGetProduct: "Erro ao buscar produto",
  errorGetAllProducts: "Erro ao buscar todos os produtos",
  errorCreateSale: "Erro ao cadastrar venda",
  errorUpdateSale: "Erro ao atualizar venda",
  errorDeleteSale: "Erro ao deletar venda",
  errorGetSale: "Erro ao buscar venda",
  errorGetAllSales: "Erro ao buscar todas as vendas",
  minField: (field, min) => `O campo '${field}' deve ser maior que ${min}`,
  errorCreateCustomer: "Erro ao cadastrar cliente",
  errorUpdateCustomer: "Erro ao atualizar cliente",
  errorDeleteCustomer: "Erro ao deletar cliente",
  errorGetCustomer: "Erro ao buscar cliente",
  noRegisteredCustomer: "Nenhum cliente registrado",
  errorGetAllCustomers: "Erro ao buscar todos os clientes",
  cpfSize: "digite os 11 numeros do CPF",
  cpfInvalid: "CPF invalido",
  emailValid: "O campo email precisa ter um formato valido",
  errorImageUrl: "A url informada não existe no banco de dados",
  imageNoInformed: "Imagem não informada",
  arrayValid: "O campo pedidos produtos deve ser um array",
  productInRequest: "O produto está associado a pedidos e não pode ser excluído.",
  imageNoLocalized: "Imagem nao existe",
  errorIdCustomer: "Por favor adicionar id do cliente",
  errorOrder: "Por favor adicionar pelo menos um pedido",
  errorIdOrder: "Id do produto invalido ",
  errorAmountOrder: "Por favor acrescentar pelo menos 1 unidade do produto",
  insuffientAmountProduct: "Quantidade de produto indisponivel no estoque",
  requestsCreate: "Pedido feito com Sucesso",
  idCustomerNot: "Cliente não encontrado ou ID invalido",
  noExistentProduct: "Produto inexistente"
};