const messages = require("../../services/messages");
const knex = require("../../conexion");

const groupOrder = async (req, res) => {
    try {

      const order = [];
      let completedOrders  = [];
      let products
      const requestsRequirements = await knex("request_products")


        const { cliente_id } = req.query;

        if (cliente_id) {
          const clientExist = await knex("clients").where("id", cliente_id).first();
            if(!clientExist){
              return res.status(404).json({ mensagem: messages.idCustomerNot });
            }

          products = await knex("requests")
                          .where("client_id", clientExist.id)

          }else {
            products = await knex("requests")
                          
          }
               

              for(let item of products){
                
                order.push({pedido:{
                  id: item.request_id,
                  valor_total: item.value_total,
                  observacao: item.observação,
                  cliente_id: item.client_id
              },
              pedido_produtos:completedOrders 
            })
                for(let item2 of requestsRequirements){
                  if(item.id == item2.request_id){
                    completedOrders .push({
                      id: item2.id,
                          quantidade_produto: item2.amount_products,
                          valor_produto: item2.value_products,
                          pedido_id: item2.request_id,
                          produto_id: item2.products_id
                  })
                  }
                  
                }
                completedOrders = [];
          } 
          
          return res.status(200).json(order);

          
         
  } catch (error) {
        console.info(error.message);
            return res.status(500).json({ mensagem: messages.error });
      }
};


module.exports = groupOrder;