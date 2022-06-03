const estabelecimentosJson = require("./src/model/estabelecimentos.json")
const express = require("express")
const cors = require("cors")
const PORT = 9898
const app = express()
app.use(cors())
app.use(express.json())

//mostrando todas as informaçoes dos estabelecimentos
app.get("/informacoesestabelecimentos", (request, response) =>{

response.status(200).json(estabelecimentosJson)

})
// buscando estabelecimento por id
app.get("/estabelecimentos/buscar/:id", (request, response) =>{

let idRequest = request.params.id
let estabelecimentoEncontrado = estabelecimentosJson.find(local => local.id == idRequest)
response.status(200).json(estabelecimentoEncontrado)


})


// buscando estabelecimento por nome

app.get("/estabelecimentos/filtro", (request, response) =>{

let tituloRequest = request.query.titulo.toLowerCase()
let estabelecimentoEncontrado = estabelecimentosJson.filter(local => local.nome.toLowerCase().includes(tituloRequest))

response.status(200).json(estabelecimentoEncontrado)

})

// cadastrando um novo estabelecimento

app.post("/estabelecimentos/cadastrar", (request, response) => {

let bodyRequest = request.body
let novoEstabelecimento = {


    id: (estabelecimentosJson.length)+1,
    likes: bodyRequest.likes,
    nome: bodyRequest.nome,
    endereço: bodyRequest.endereço,
    numero: bodyRequest.numero,
    bairro: bodyRequest.bairro,
    cidade: bodyRequest.cidade,
    telefone: bodyRequest.telefone,
    pagamento: bodyRequest.pagamento,
    site: bodyRequest.site

}
estabelecimentosJson.push(novoEstabelecimento)
response.status(201).json(novoEstabelecimento)

}


)

app.listen(PORT, () =>{

console.log(`O servidor está rodando na porta ${PORT}`)


})