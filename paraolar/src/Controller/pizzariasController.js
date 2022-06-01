const { request, response } = require('../app')
const pizzariasModels = require('../models/pizzariaModels.json')

const getAllPizzarias = (req, res) => {
    /**
     * find -> encontrar
     * All -> todos
     * Ebooks -> recurso
     */
   res.status(200).json({
       "message": "retornando todos as pizzarias",
        "pizzarias": pizzariasModels
   })
}

const getById = (req, res) => {
    const id = req.params.id
    // const findPizzaria = pizzariasModels[id] 
    try {
        const findPizzarias pizzariasModels.find(pizzariasModels => pizzarias.id == id)// null | ebook
        
        if (!findPizzarias) throw new Error(`desculpa, não foi possivel encontrar a pizzaria por id ${id}`)

        res.status(200).json(findPizzarias)

    } catch (error) {
        res.status(404).json({
            message: "Poxa, desculpa, foi mal, ainda não temos esse sabor em  nosso catálago.",
            details: error.message,
        })
    }
}

const getOneByName =(request, response) =>{
    const {name} = request.query.name
    try {
        if(!name) throw new Error (" Nenhum parametro inserido para busca")
        const findAllPizzarias = pizzariasModels.find(currentPizzarias => currentPizzarias.name ==name)
        if(!findAllPizzarias) throw new Error ("desculpa, nao foi possivel encontrar essa pizzaria")
    }catch (error) {

    }
}

const getByAdress = ( request , response) =>{
    const {adress} = request.params.adress
    try {
        if(!adress) throw new Error ("Nenhum endereço encontrado")

    } catch (error) {
        
    }
}

const createPizzaria = async(request, response)=>{
    let pizzariaModels = await Models()

    let bodyRequest = request.body

    let novaPizzaria = {
        id: (pizzariaModels.length)+1, 
        name: bodyRequest.name, 
        endereço: bodyRequest.endereço,
        contato :bodyRequest.contato,
        sabores: bodyRequest.sabores
    }
    pizzariaModels.push(novaPizzaria)
    
    response.status(201).send({
        "mensagem": "pizzaria cadastrada com sucesso",
        novaPizzaria
    })
}
module.exports = {
    getAllPizzarias,
    getdById,
    getOneByName,
    getByAdress,
    getByContacty,
    createPizzaria
}