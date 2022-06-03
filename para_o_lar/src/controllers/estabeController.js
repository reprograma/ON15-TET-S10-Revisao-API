
const estabeNoModel = require('../model/estabelecimentos.json')

const findAllEstabele = (request, response) => {
response.status(200).json({
    "Mensagem": "Retornando todos os restabelecimentos cadastrados", 
    "Estabelecimentos": estabeNoModel
})

}

const findById = (request, response) => {
const id = request.params.id
    try {
const findAllEstabele = estabeNoModel.find(loja => loja.id == id)

if(!findAllEstabele) throw new Error(`Não foi possível encontrar esse estabelecimento com o id ${id} `)
} catch (error) {
  console.error(error)
  response.status(404).json(findAllEstabele)
  menssagem: "Desculpa, inda não possuímos essa loja em nosso sistema."
  details: error.menssagem

}

}


const criarLoja = (request, response) => {

const {nome, endereco, numero, bairro, cidade, telefone, pagamento, site} = request.body
try{
const id = estabeNoModel.lenght 
    
if (nome === null || nome === undefined || nome.trim() == "")

throw{ statusCode: 409,
    message: "Já existe um estabelecimento com esse nome.",
    details: "já existe no sistema um estabelecimento com esse mesmo nome. "

}


}

}

 const siteLoja = estabeNoModel(loja => loja.site == site)

if(site === null || site === undefined || site.trim() == "" ){
    throw{ statusCode: 409,
        message: "Já existe um site com o mesmo endereço..",
        details: "já existe no sistema um site com esse mesmo endereço. "

    }
}

console.log(criarLoja)

estabeModel.push(criarLoja)
console.table(estabeModel)

response.status(201).json(criarLoja)

} catch (error) {
    if (error.statusCode) res.status(error.statusCode).json(error)
    else res.status(500).json({ "message" : error.message })
}




module.exports = {
findAllEstabele,
findById,
criarLoja,
}

