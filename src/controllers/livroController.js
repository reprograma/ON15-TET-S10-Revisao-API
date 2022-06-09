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
        let {id} = request.params.id
        let findEbook = livrosModel.find(livro => livro.id == id)

        if(!findEbook) throw new Error(`desculpa, não foi possível encontrar o id ${id}`)

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
    const {title = "vazio"} = request.query
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

const createEbook = (request, response) => {
    const { titulo, paginas, autor } = request.body

    try {
        const id = livrosModel.length
        if (titulo === null || titulo === undefined || titulo.trim() === "") throw {
            statusCode: 400,
            message: "Não pode ser criado, poois o título é requerido.",
            details: "Já existe no sistema um livro com o mesmo título e autor"

        }
        const findEbookByTitle = livrosModel.find(ebook => ebook.titulo.toLowerCase() == titulo.toLowerCase())

        if (findEbookByTitle && findEbookByTitle.autor.toLowerCase() == autor.toLowerCase()){
            throw{
                statusCode: 409,
                message: "Já existe um livro com o mesmo titulo e autor",
                details: "Já existe no sistema um livro com o mesmo título e autor"
            }

        }

        const newEbook = {id, titulo, paginas, autor}
        livrosModel.push(newEbook)

        response.status(201).json(newEbook)
    } catch (error) {
        
    }

}

module.exports = {
    findAllEbooks,
    findById,
    findOneEbookByTitle,
    createEbook
}