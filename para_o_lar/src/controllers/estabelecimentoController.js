const estabelecimentos = require('../model/estabelecimentos.json')
const createEstabelecimento = (request, response) => {
  /*
  Id:  Campo de identificação , que receba um numero
  Nome: Campo de identificação , recebe texto
  Endereço: Campo, recebe texto

    1- Devo criar um objeto a partir da request pegando o body da requisição, desse body eu vou extrair
    o nome  e o endereço
    2- devo criar um novo id 
    3-  devo adicionar um novo estabelecimento a lista
    4- devo retornar para o client uma response com status (201) e o estabelecimento que foi criado 
 antes disso devo encontrar o estabelecimento a partir do id que foi gerado , retornado ele um Json.

  */
const {nome, endereco} = request.body
    const id = estabelecimentos.length +1
    const novoEstabelecimento = { id, nome, endereco,}
    if (estabelecimentos.find(estabelecimento => estabelecimento.nome == nome)) {
        return response.status(409).json({
            message: " Nome de estabelecimento já cadastrado"
        })
    } 
    estabelecimentos.push(novoEstabelecimento)
    response.status(201).json(novoEstabelecimento)
    console.log(novoEstabelecimento)
}



module.exports = {
    createEstabelecimento
}