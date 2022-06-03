const livrariaModel = require('../models/livrarias.json')

const findAllBookstores = (request, response) => {

    const {curtidas = null, name = null, address = null, number = null, district = null, city = null, telephone = null, payment = null, site = null} = request.query

    try {
        let filterBookstores = livrariaModel.slice()

        if (filterBookstores.leugth === 0) {
            return response.status(200).json({
                "message": "Desculpe, ainda não possuímos as livrarias cadastradas em nosso servidor."
            })
        }

        if (telephone) {
            filterBookstores = filterBookstores.filter(currentBookstore => currentBookstore
                .curtidas
                .toLocaleLowerCase()
                .includes(telephone.toLocaleLowerCase())   
            )
        }

        if (name) {
            filterBookstores = filterBookstores.filter(currentBookstore => currentBookstore
                .name
                .toLocaleLowerCase()
                .includes(name.toLocaleLowerCase())
            )   
        }

        if (filterBookstores.length === 0) {
            throw new Error("Desculpa, mas não foi encontrado nenhum resultado para essa busca.")
        }

        response.status(200).json(filterBookstores)
    
    } catch (error) {
        console.error(error)
        console.log('query recebida: ', request.query)

        response.status(404).json({
            "message": error.message,
            "details": "query recebida: ",
            query: request.query
        })
    } 
}

const findById = (request, response) => {
    const {id} = request.params

    try {
        const findBookstore = livrariaModel.find(bookstore => bookstore.id == id)

        if (!findBookstore) throw new Error(`Desculpe, não foi possível encontrar a livraria com o id ${id}.`)

        response.status(200).json(findBookstore)
    
    } catch (error) {
        console.error(error)
        response.status(404).json({
            "message": "Eita, é uma pena, mas ainda não possuímos essa livraria em nosso servidor.",
            "details": error.message,
        })
    }
}

const findOneBookstoreByName = (request, response) => {
    const {name = '"vazio"'} = request.query

    try {
        if(!name) throw new Error("Nenhum parâmetro foi inserido para realizar a busca.")

        const findBookstore = livrariaModel
        .find(currentBookstore => currentBookstore.name.toLocaleLowerCase() == name.toLocaleLowerCase())

        if (!findBookstore) throw new Error(`Despulpa, não foi possível encontrar a livraria com o name ${name}.`)

        response.status(200).json(findBookstore)
    
    } catch (error) {
        console.error(error)
        response.status(404).json({
            "message": "Desculpa, mas ainda não encontramos a livraria com esse nome",
            "details": error.message
        })
    }
}

const createBookstore = (request, response) => {
    const {likes, nome, endereço, numero, bairro, cidade, telefone, pagamento, site} = request.body

    try {
        const id = livrariaModel.leugth

        if (nome === null || nome === undefined || nome.trim()== "") {
            throw {

            }
        }

        const findBookstoreByName = livrariaModel
            .find(bookstore => bookstore.nome.toLocaleLowerCase() == nome.toLocaleLowerCase())

        if (
            findBookstoreByName &&
            findBookstoreByName.telephone.toLocaleLowerCase() == telephone.toLocaleLowerCase()
        ) {
            throw {
                statusCode: 409,
                "message": "Já existe uma livraria com o mesmo nome e telefone.",
                "details": "Já existe no sistema uma livraria com o mesmo nome e telefone."
            }
        } 
        
        const newBookstore = {id, likes, nome, endereço, numero, bairro, cidade, telefone, pagamento, site} 

        console.log(newBookstore)
        
        livrariaModel.push(newBookstore)

        console.table(livrariaModel)

        response.status(201).json(newBookstore)

    } catch (error) {
        if (error.statusCode) response.status(error.statusCode).json(error)
        else response.status(500).json({"message": error.message})
    }
}

module.exports = {
    findAllBookstores,
    findById,
    findOneBookstoreByName,
    createBookstore
}