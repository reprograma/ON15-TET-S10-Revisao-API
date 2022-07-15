const { response } = require("../app")
const estabelecimentosModel = require("../model/estabelecimentos.json")

const getAll = (req, res) => {
    res.status(200).send(estabelecimentosModel)

}

const createMovie = (request, response)=>{
    
    let bodyRequest = request.body

    let novoEstabelecimento = {
        id: (filmesJson.length)+1, 
        likes: bodyRequest.likes,
        nome: bodyRequest.nome,
        endereço: bodyRequest.endereço,
        numero: bodyRequest.numero,
        bairro: bodyRequest.bairro,
        cidade: bodyRequest.cidade,
        telefone: bodyRequest.telefone,
        pagamento: bodyRequest.pagamento,
        site : bodyRequest.site
        
    }
    estabelecimentosModel.push(novoEstabelecimento)
    
    response.status(201).send({
        "mensagem": "Estabelecimento cadastrado com sucesso",
        novoEstabelecimento
    })
}

const atualizarEnd = (req, response)=>{
   
    const atualizarEnd = req.query.Titulo.toLowerCase();
    const novoEnd = req.body.Title
    const EstabelecimentoEncontrado = estabelecimentosJson.find(
        estabelecimentos => estabelecimentos.Title.toLowerCase().includes(atualizarEnd))

    filmeEncontrado.Title = novoTitulo

    response.status(200).json([{
        "mensagem":"Endereço atualizado com sucesso",
        EnderecoEncontrado

    }])


}


const likes = (req , res) =>{
    let idRequest = req.params.id 
    let estabelecimentoEncontrado = estabelecimentosModel.find(
        estabelecimentos=>estabelecimentos.id == idRequest)
        estabelecimentoEncontrado.likes=estabelecimentoEncontrado.likes +1

        res.status(201).send({
            "mensagem": "Estabelecimento curtido com sucesso",
            estabelecimentoEncontrado

        })

}

const deslikes = (req , res) =>{
    let idRequest = req.params.id 
    let estabelecimentoEncontrado = estabelecimentosModel.find(
        estabelecimentos=>estabelecimentos.id == idRequest)
        estabelecimentoEncontrado.deslikes=estabelecimentoEncontrado.deslikes -1

        res.status(201).send({
            "mensagem": "Estabelecimento descurtido com sucesso",
            estabelecimentoEncontrado

        })

}

