const checkInModel = require("../model/estabelecimentos.json")

const pagInicial = (request, response) => {
    return response.status(200).json({
        message: "Seja Bem vinde ao Check In - API de consulta & avaliação de estabelecimentos na Grande Sim City"
    })
}

const findAll = (request, response) => {
    const {nome = null, bairro = null} = request.query

    try {
        let filterPlace = checkInModel.slice()

        if (filterPlace.length === 0){
            return response.status(200).json({
                message: "Por enquanto não temos estabelecimentos cadastrados."
            })
        }

        if (nome){
            filterPlace = filterPlace.filter(currentPlace => currentLocal.nome.toLocaleLowerCase().includes(nome.toLowerCase()))
        }

        if (bairro){
            filterPlace = filterPlace.filter(currentPlace => currentPlace.bairro.toLocaleLowerCase().includes(bairro.toLowerCase()))
        }

        if (filterPlace.length === 0){
            throw new Error("Desculpe o transtorno, mas ainda não foi encontrado nenhum resultado.")
        }
        response.status(200).json(filterPlace)
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
        let findPlace = checkInModel.find(place => place.id == id)

        if(!findPlace) throw new Error(`Foi mal, não foi possível encontrar o id ${id}`)

        response.status(200).json(findPlace)
    } catch (error){
        console.error(error)
        response.status(404).json({
            message: "Poxa, não temos esse place registrado",
            details: error.message,
            errorCode: 404
        })
    }
}

const findOnePlaceByName = (request, response) => {
    const { nome = "vazio" } = request.query
    try {
        if(!nome) throw new Error ("Nenhum parâmetro inserido. Impossível realizar busca")
        const findPlace = checkInModel.find(currentPlace => currentPlace.nome.toLocaleLowerCase() == nome.toLocaleLowerCase())

        if(!findPlace) throw new Error(`Desculpa, não foi possível encontrar o estabelecimmento ${nome}`)

        response.status(200).json(findPlace)
    } catch (error) {
        console.error(error)
        response.status(404).json({
            message: "Poxa, não temos esse place registrado",
            details: error.message,
            errorCode: 404
        })
    }
}

const findByPayment = (request, response) => {
    const { formasPagamento = null } = request.query
    try {
        let filterPlace = checkInModel.slice()
        let payment = []

        for(let i = 0; i < checkInModel.length; i++){
            let payments = filterPlace[i].pagamento
            
            if (!formasPagamento) {
                payment.push({
                    "Formas de pagamento": payments
                })
            } else if (formasPagamento){
                if(payments.toString().toLocaleLowerCase().includes(formasPagamento.toLocaleLowerCase())){
                    payment.push({
                        "Formas de pagamento": payments
                    })
                }
            }

            if(payment.length === 0){
                throw new Error(`Desculpa, não tem essa forma de pagamento registrada.`)
            }
        }

        response.status(200).json({
            "Pagamento em:": request.query,
            "Estabelecimentos:": payment
        })
    } catch (error) {
        console.error(error)
        response.status(404).json({
            message: "Poxa, não temos esse pagamento registrado",
            details: error.message,
            errorCode: 404
        })
    }
}

const createPlace = (request, response) => {
    const { nome, endereco, numero, bairro, cidade, telefone, pagamento, site } = request.body

    try {
        const id = checkInModel.length
        if (nome === null || nome === undefined || nome.trim() === "") throw {
            statusCode: 400,
            message: "Não pode ser criado, falta nome do estabelecimento."
        }

        const findPlaceByName = checkInModel.find(place => place.nome.toLocaleLowerCase() == nome.toLocaleLowerCase())
        if(findPlaceByName && findPlaceByName.endereço.toLocaleLowerCase() && findPlaceByName.numero == endereco.toLocaleLowerCase()) throw{
            statusCode: 409,
            message: "Já existe um estabelecimento de mesmo nome e endereço",
            details: "Já existe no sistema estabelecimento com mesmo nome e endereço."
            }

        const newPlace = {id, nome, endereco, numero, bairro, cidade, telefone, pagamento, site}
        checkInModel.push(newPlace)

        response.status(201).json(newPlace)
    } catch (error) {
        if (error.statusCode) response.status(error.statusCode).json(error)
        else response.status(500).json({
            message: error.message
        })
    }
}

const deletePlace = (request, response) => {
    const { id } = request.params
    const findPlace = checkInModel.find(currentPlace => currentPlace.id == id)
    let indice = checkInModel.indexOf(findPlace)
    let removePlace = checkInModel.splice(indice, 1)

    response.status(200).send({
        message: "Estabelecimento removido com sucesso.", removePlace
    })
}

module.exports = {
    pagInicial,
    findAll,
    findById,
    findOnePlaceByName,
    findByPayment,
    createPlace, 
    deletePlace
}
