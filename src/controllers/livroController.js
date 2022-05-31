<<<<<<< HEAD
const livrosModel = require('../models/livrosModels.json')

const findAllEbooks = (req, res) => {
    /**
     * find -> encontrar
     * All -> todos
     * Ebooks -> recurso
     */
    const { title = null, page = null, autor = null } = req.query

    try {
        let filterEbooks = livrosModel.slice()

        if (filterEbooks.length===0) {
            return res.status(200).json({
                message:  "Ainda não possuimos livros cadastrados em nossa biblioteca"
            })
        }

        if (autor) {
            filterEbooks = filterEbooks.filter(currentEbook => currentEbook
                .autor
                .toLocaleLowerCase()
                .includes(autor.toLocaleLowerCase())
            )
        }

        if (title) {
            filterEbooks = filterEbooks.filter(currentEbook => currentEbook
                .titulo
                .toLocaleLowerCase()
                .includes(title.toLocaleLowerCase())
            )
        }

        if (filterEbooks.length === 0) {
            throw new Error("descupa, mas não foi encontrado nenhum resultado para essa busca")
        }

        res.status(200).json(filterEbooks)

    } catch (error) {
        console.error(error)
        console.log('query recebida: ', req.query)

        res.status(404).json({
            message: error.message,
            details: "query invalida: ",
            query: req.query
=======
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
>>>>>>> 9b15933 (aula 28/05)
        })
    }
}

<<<<<<< HEAD
const findById = (req, res) => {
    const { id } = req.params
    // const findEbook = livrosModel[id] 
    try {
        const findEbook = livrosModel.find(ebook => ebook.id == id)// null | ebook

        if (!findEbook) throw new Error(`desculpa, não foi possivel encontrar o livro com o id ${id}`)

        res.status(200).json(findEbook)

    } catch (error) {
        console.error(error)
        res.status(404).json({
            message: "Poxa, desculpa, foi mal, ainda não possuimos esse livro no nosso catálago.",
            details: error.message,
=======
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
>>>>>>> 9b15933 (aula 28/05)
        })
    }
}

<<<<<<< HEAD
const findOneEbookByTitle = (req, res) => {
    // const req.query.title
    // authorRequest
    const { title = '"vazio"' } = req.query

    try {

        if (!title) throw new Error("Nenhum parametro inserido para relizar a busca")

        const findEbook = livrosModel
            .find(currentEbook => currentEbook.titulo.toLocaleLowerCase() == title.toLocaleLowerCase())

        if (!findEbook) throw new Error(`desculpa, não foi possivel encontrar o livro com o title ${title}`)

        res.status(200).json(findEbook)

    } catch (error) {
        console.error(error)
        res.status(404).json({
            "message": "desculpa, ainda não possuimos livros com esse titulo",
            "details": error.message
        })
    }
}

const createEbook = (req, res) => {
    const { title, paginas, author} = req.body

    if (!title || title.trim()== "") throw new Error()
}

module.exports = {
    findAllEbooks,
    findById,
    findOneEbookByTitle
=======
module.exports = {
    findAllEbooks,
    findById,
    findOneEbookByTitle,
>>>>>>> 9b15933 (aula 28/05)
}