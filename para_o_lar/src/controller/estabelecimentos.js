const Estabelecimentos = require("../model/estabelecimentos.json");


const listarEstabelecimentos = (request, response) => {
    let encontrarEstabelecimento = Estabelecimentos.find()

    response.status(200).send(encontrarEstabelecimento)
}


const cadastrarEstabelecimento = (request, response) => {
    const { nome, endereco, numero, bairro,
        cidade, telefone, pagamento, site } = request.body

    const id = estabelecimentosModel.length + 1

    const novoEstabelecimento = { id, likes, nome, endereco, numero, bairro, cidade, telefone, pagamento, site }

    Estabelecimentos.push(novoEstabelecimento)

    res.status(201).send(newcurrentEstabelecimento)
}




module.exports = {
    listarEstabelecimentos,
    cadastrarEstabelecimento
}