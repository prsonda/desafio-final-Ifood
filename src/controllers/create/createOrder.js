const messages = require("../../services/messages");
const knex = require("../../conexion");
const transporte = require("../../email");
const compiler = require("../../utils/compilerHTML");

const createOrder = async (req, res) => {
  const { cliente_id, observacao, pedido_produtos } = req.body;
   
  try {

    if(!cliente_id){
      return res.status(400).json({
         mensagem: messages.errorIdCustomer})
    }
    if(!pedido_produtos || pedido_produtos.length == 0){
      return res.status(400).json({
        mensagem: messages.errorOrder})
    }

    const clientExist = await knex("clients").where("id", cliente_id).first();
    
    if (!clientExist) {
    return res.status(400).json({
      mensagem: messages.idCustomerNot,
    });
    }
  
    let value_total = 0

  for (const item of pedido_produtos) {

      const produtoID = item.produto_id
      const amount = item.quantidade_produto

      if (!produtoID || produtoID == 0 ) {
        return res.status(400).json({
          mensagem: messages.errorIdOrder
        })
      } 
      
      if (!amount || amount == 0) {
        return res.status(400).json({
          mensagem: messages.errorAmountOrder
        })
      }

      const checkProduct = await knex("products").where("id",produtoID ).first();

      if (!checkProduct) {
        return res.status(400).json({
          mensagem: messages.noExistentProduct,
        });
      }

          value_total += (amount * checkProduct.value)

     if (checkProduct.quantity_stock < amount) {
        return res.status(400).json({
          mensagem: messages.insuffientAmountProduct,
        });
      }

      await knex("products")
      .update({quantity_stock: checkProduct.quantity_stock - amount})
      .where("id",produtoID)
   }


   await knex("requests")
   .insert({
    client_id:cliente_id,
    observação:observacao,
    value_total
    });

    for (const item of pedido_produtos) {
      const produtoID = item.produto_id
      const amount = item.quantidade_produto

      const checkProduct = await knex("products").where("id",produtoID ).first();
  
      const check = await knex("requests").select("*").orderBy("id","desc").first()

      await knex("request_products")
      .insert({
       request_id:check.id,
       products_id: produtoID ,
       amount_products: amount ,
       value_products: checkProduct.value
      });

    }
      
const html = await compiler('./src/templates/email.html',{
  nomeusuario: clientExist.name
})


    transporte.sendMail({
      from: `${process.env.EMAIL_NAME}<${process.env.EMAIL_FROM}>`,
      to: `${clientExist.name} <${clientExist.email}>`,
      subject: "Pedido Realizado",
      html,
    })
    
    return res.status(201).json({ mensagem: messages.requestsCreate });
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({ mensagem: messages.error });
  }
};

  module.exports = createOrder;