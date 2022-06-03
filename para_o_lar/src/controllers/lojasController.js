const lojasModel = require("../model/estabelecimentos.json")

const findAllBookstores = (req, res) => {
    const{ id, likes, nome, endereço, numero, bairro, cidade, telefone, pagamento, site } = req.query

    try {
        let filterBookstores = lojasModel.slice()
         
        if(filterBookstores.length==0) {
            return res.status(200).json({
                message: "Ainda não possuímos estabelecimentos cadastrados em nossa biblioteca"
            })
        }

        if (filterBookstores.length === 0){
            throw new Error("Desculpa, mas não foi encontrado nenhum resultado para essa busca.")
        }

        res.status(200).json(filterBookstores)
    } catch (error) {
        console.error(error)
        console.log('query recebida: ', req.query)

        res.status(404).json({
            message: error.message,
            details: "Não foi possível encontrar um resultado para essa query.",
            query: req.query
        })         
    }
}

const findById = (req, res) => {
    const id = req.params.id    
    try {
        const findBookstore = lojasModel.find(bookstore => bookstore.id == id)
        
        if (!findBookstore) throw new Error(`desculpa, não foi possivel encontrar o estabelecimento com o id ${id}`)

        res.status(200).json(findBookstore)

    } catch (error) {
        console.error(error)
        res.status(404).json({
            "message": "Poxa, infelizmente ainda não possuimos esse estabelecimento no nosso catálago.",
            "details": error.message,
        })
    }
}

const findBookstoreByName = (req, res) => {
    // const req.query.title
    // authorRequest
    const { name = '"vazio"' } = req.query

    try {

        if (!name) throw new Error("Nenhum parametro inserido para relizar a busca")

        const findBookstore = lojasModel
            .find(currentBookstore => currentBookstore.nome.toLocaleLowerCase() == title.toLocaleLowerCase())

        if (!findBookstore) throw new Error(`desculpa, não foi possivel encontrar o estabelecimento com o nome ${name}`)

        res.status(200).json(findBookstore)

    } catch (error) {
        console.error(error)
        res.status(404).json({
            "message": "desculpa, ainda não possuimos livros com esse titulo",
            "details": error.message
        })
    }
}

const createNewBookstore = (req, res) => {
    const { id, likes, nome, endereço, numero, bairro, cidade, telefone, pagamento, site } = req.body

    try {
        const id = lojasModel.length+1

        if(nome === null || nome === undefined || nome.trim() == "") {
        throw{
            statusCode: 400,
            message: "Não pode ser criado, pois o nome do estabelecimento é requerido.", raw,
            details: `O nome recebido inválido foi: ${nome}`
        }
    }

        const findBookstoreByName = lojasModel.find(bookstore => bookstore.nome.toLocaleLowerCase() ==nome.toLocaleLowerCase())

        if(findBookstoreByName && findBookstoreByName.endereço.toLocaleLowerCase() == endereço.toLocaleLowerCase()) {
            throw {
                statusCode: 409,
                mensage: "Já existe uma livraria com o mesmo nome e endereço.",
                details :"Já existe no sistema uma livraria com o mesmo nome e endereço."
            }
        }

        console.log(id)

        const newBookstore = {
            id, likes, nome, endereço, numero, bairro, cidade, telefone, pagamento, site
        }

        console.log(newBookstore)

        lojasModel.push(newBookstore)

        console.table(lojasModel)

        res.status(201).json(newBookstore)

    } catch (error) {
        if(error.statusCode) res.status(error.statusCode).json(error)
        else res.status(500).json({"message" : error.message})
        
    }

}


module.exports = {
    findAllBookstores,
    findById,
    findBookstoreByName,
    createNewBookstore
    
}