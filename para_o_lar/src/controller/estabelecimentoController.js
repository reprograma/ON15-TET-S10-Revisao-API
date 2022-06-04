
const { response } = require('../app')
const estabelecimentosJson = require('../model/estabelecimentos.json')

const createEstabelecimentos = (request, response) => {
    try {

        let bodyRequest = request.body

        let novoEstabelecimento = {
            id: (estabelecimentosJson.lenght) + 1,
            likes: bodyRequest.likes,
            nome: bodyRequest.nome,
            endereço: bodyRequest.endereço,
            numero: bodyRequest.numero,
            bairro: bodyRequest.bairro,
            cidade: bodyRequest.cidade,
            telefone: bodyRequest.telefone,
            pagamento: bodyRequest.pagamento,
            site: bodyRequest.site,
        }

        estabelecimentosJson.push(novoEstabelecimento)

        response.status(201).send({
            "mensagem": "Novo estabelecimento cadastrado com suor e sucesso",
            novoEstabelecimento

        })
    } catch (err) {
        response.status(500).send({
            "mensagem": "Erro ao cadastrar, deu ruim!"
        })
    }
}

const updateEstabelecimentos = (request, response) => {

    try {
        const estabelecimentoId = request.params.id

        let newUpdate = request.body 

        newUpdateFind = estabelecimentosJson.find((estabelecimentos) => estabelecimentos.id = estabelecimentoId)
        let update = {
            endereço: newUpdate.endereço
        }
        estabelecimentosJson.push(update)

        response.status(200).json([{
            messagem: "Endereço do estabelecimento atualizado",
            update
        }])

    } catch (err) {
        response.status(500).send({
            "mensagem": "Erro ao atualizar, deu ruim!"
        })
    }
}

module.exports = {
    createEstabelecimentos,
    updateEstabelecimentos
}