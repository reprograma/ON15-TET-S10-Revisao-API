const livrosModel = require("../models/livrosModels.json")

const findAllEbooks = (request, response) => {
    const {title = null, page = null, autor = null} = request.query
    
    try {
        let filterEbooks = livrosModel.slice()
        
        if(filterEbooks.length === 0){
            return response.status(200).json({
                message: "Ainda não possuimos livros cadastrados em nossa biblioteca"
            })
        }

        if (autor){
            filterEbooks = filterEbooks.filter(currentEbook => currentEbook.autor.toLowerCase().includes(autor.toLowerCase()))
        }

        if (title){
            filterEbooks = filterEbooks.filter(currentEbook => currentEbook.titulo.toLowerCase().includes(title.toLowerCase()))
        }

        if (filterEbooks.length === 0){
            throw new Error("Desculpa, mas não foi encontrado nenhum resultado para essa busca.")
        }
        response.status(200).json(filterEbooks)
        
    } catch (error) {
        console.error(error)
        console.log("query recebida: ", request.query)

        response.status(404).json({
            message: error.message,
            details: "Não foi possível encontrar um resultado para essa query :(",
            errorCode: 404
        })
    }
}

const findById = (request, response) => {
   try {
        let idRequest = request.params.id
        let findEbook = livrosModel.find(livro => livro.id == idRequest)

        if(!findEbook) throw new Error(`desculpa, não foi possível encontrar o id ${idRequest}`)

        response.status(200).json(findEbook)
   } catch (error){
       console.error(error)
       response.status(404).json({
           message: "Poxa, não temos esse livro no catálogo, foi mal :(",
           details: error.message,
           errorCode: 404
       })
   }
}

const findOneEbookByTitle = (request, response) => {
    const {title} = request.query
    try {
        if(!title) throw new Error ("Nenhum parametro inserido para realizar a busca.")
        const findEbook = livrosModel.find(currentEbook => currentEbook.titulo.toLowerCase() == title.toLowerCase())
        
        if(!findEbook) throw new Error(`Desculpa, não foi possível encontrar o livro de ${title}`)

        response.status(200).json(findEbook)


    } catch (error) {
        console.error(error)
        response.status(404).json({
            message: "Poxa, ainda não temos esse livro no catálogo, foi mal :(",
            details: error.message,
            errorCode: 404
        })
    }
}

module.exports = {
    findAllEbooks,
    findById,
    findOneEbookByTitle,
}