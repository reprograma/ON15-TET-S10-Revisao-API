const checkInModel = require("../model/estabelecimentos.json")

const pagInicial = (request, response) => {
    return response.status(200).json({
        message: "Seja Bem vindo ao Check In - Consulta & avaliação de estabelecimentos em todo Estado de Campo Grande!"
    })
}

const findAll = (request, response) => {
    const {nome = null, bairro = null} = request.query

    try {
        const filterLocal = checkInModel.slice()

        if (filterLocal.length === 0){
            return response.status(200).json({
                message: "Não temos esse estabelecimento cadastrado."
            })
        }

        if (nome){
            filterLocal = filterLocal.filter(currentLocal => currentLocal.nome.toLocaleLowerCase().includes(nome.toLowerCase()))
        }

        if (bairro){
            filterLocal = filterLocal.filter(currentLocal => currentLocal.bairro.toLocaleLowerCase().includes(bairro.toLowerCase()))
        }

        if (filterLocal.length === 0){
            throw new Error("No momento, não foi encontrado nenhum resultado. :(")
        }
        response.status(200).json(filterLocal)
    } catch (error) {
        console.error(error)
        console.log("query recebida: ", request.query)

        response.status(404).json({
            message: error.message,
            details: "Não foi possível encontrar resultado para essa query :(",
            errorCode: 404
        })
    }
}

const findById = (request, response) => {
    try {
        let id = request.params.id
        let findLocal = checkInModel.find(local => local.id == id)

        if(!findLocal) throw new Error(`Não foi possível encontrar o id selecionado ${id}`)

        response.status(200).json(findLocal)
    } catch (error){
        console.error(error)
        response.status(404).json({
            message: "No momento, não há esse local registrado",
            details: error.message,
            errorCode: 404
        })
    }
}

const findOneLocalByName = (request, response) => {
    const { nome = "vazio" } = request.query
    try {
        if(!nome) throw new Error ("Nenhum parâmetro inserido. Impossível realizar busca")
        const findLocal = checkInModel.find(currentLocal => currentLocal.nome.toLocaleLowerCase() == nome.toLocaleLowerCase())

        if(!findLocal) throw new Error(`Não foi possível encontrar o estabelecimmento ${nome}`)

        response.status(200).json(findLocal)
    } catch (error) {
        console.error(error)
        response.status(404).json({
            message: "Não temos esse local registrado",
            details: error.message,
            errorCode: 404
        })
    }
}

const createLocal = (request, response) => {
    const { nome, endereco, numero, bairro, cidade, telefone, pagamento, site } = request.body

    try {
        const id = checkInModel.length
        if (nome === null || nome === undefined || nome.trim() === "") throw {
            statusCode: 400,
            message: "Não pode ser criado, falta nome do estabelecimento."
        }

        const findLocalByName = checkInModel.find(local => local.nome.toLocaleLowerCase() == nome.toLocaleLowerCase())
        if(findLocalByName && findLocalByName.endereço.toLocaleLowerCase() && findLocalByName.numero == endereco.toLocaleLowerCase()) throw{
            statusCode: 409,
            message: "Já existe um estabelecimento de mesmo nome e endereço",
            details: "Já existe no sistema estabelecimento com mesmo nome e endereço."
            }

        const newLocal = {id, nome, endereco, numero, bairro, cidade, telefone, pagamento, site}
        checkInModel.push(newLocal)

        response.status(201).json(newLocal)
    } catch (error) {
        if (error.statusCode) response.status(error.statusCode).json(error)
        else response.status(500).json({
            message: error.message
        })
    }
}

module.exports = {
    pagInicial,
    findAll,
    findById,
    findOneLocalByName,
    createLocal
}