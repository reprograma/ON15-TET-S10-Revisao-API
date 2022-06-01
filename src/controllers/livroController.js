<<<<<<< HEAD
const { isNativeError } = require('util/types')
const livrosModel = require('../models/livrosModels.json')

const findAllEbooks = (req, res) =>{
    const {title = null, page = null, autor = null } =req.query

    try {
        let filterEbooks = livrosModel.slice()
        if (filterEbooks.lenght===0) {
            return res.status(200).json({
                message: "Ainda não possuímos esse livro cadastrado em nossa biblioteca"
            })
        }


=======
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

>>>>>>> bc9a0fcdb58e080516f97f067b0207f7887c7881
        if (autor) {
            filterEbooks = filterEbooks.filter(currentEbook => currentEbook
                .autor
                .toLocaleLowerCase()
                .includes(autor.toLocaleLowerCase())
<<<<<<< HEAD
        )
    }
=======
            )
        }
>>>>>>> bc9a0fcdb58e080516f97f067b0207f7887c7881

        if (title) {
            filterEbooks = filterEbooks.filter(currentEbook => currentEbook
                .titulo
                .toLocaleLowerCase()
<<<<<<< HEAD
                .includes(title.toLocaleLowerCase()
            )
            )
        }

        if (filterEbooks.lenght === 0) {
            throw new Error("Desculpa, não foi encontrado nenhum resultado para essa busca")
=======
                .includes(title.toLocaleLowerCase())
            )
        }

        if (filterEbooks.length === 0) {
            throw new Error("descupa, mas não foi encontrado nenhum resultado para essa busca")
>>>>>>> bc9a0fcdb58e080516f97f067b0207f7887c7881
        }

        res.status(200).json(filterEbooks)

    } catch (error) {
        console.error(error)
        console.log('query recebida: ', req.query)
<<<<<<< HEAD
        res.status(404).json({
            message: error.message,
            details: "Não foi possível encontrar um resultado para essa query"
=======

        res.status(404).json({
            message: error.message,
            details: "query invalida: ",
            query: req.query
>>>>>>> bc9a0fcdb58e080516f97f067b0207f7887c7881
        })
    }
}

<<<<<<< HEAD
const findById = (req, res) =>{
    const id =req.params.id
    try {
    const findEbook = livrosModel.find(livro => livro.id == id)

    // throw vai disparar uma exception ou erro, algo que não deveria acontecer
    // new é uma palavra reservada de javascript que instancia um objeto a partir de uma classe
    if(!findEbook) throw new Error(`livro com o id ${id} não encontrado`)

    res.status(200).json(findEbook)

    } catch (error){
        console.error(error)
        res.status(404).json({
            message: error.message,
            details: "Poxa, desculpa, ainda não possuímos esse livro no nosso catálogo"
        })
    }
    
}

// Encontrar um único livro pelo nome do autor
const findOneEbookByTitle = (req, res) => {
    const { title } = req.query

    try {
        if(!title) throw new Error("Nenhum parâmetro para realizar a busca")

        const findEbook = livrosModel
        .find(currentEbook => currentEbook.titulo.toLocaleLowerCase == title.toLocaleLowerCase)
        if(!findEbook) throw new Error(`não foi possível encontrar o livro com o título ${title}`)

        res.status(200).json(findEbook)
    } catch (error) {
        console.error(error)
        res.status(404).json({
            message: error.message,
            details: "Poxa, desculpa, ainda não possuímos livros com esse título"
=======
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
        })
    }
}

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
>>>>>>> bc9a0fcdb58e080516f97f067b0207f7887c7881
        })
    }
}

<<<<<<< HEAD
=======
const createEbook = (req, res) => {
    const { title, paginas, author} = req.body

    if (!title || title.trim()== "") throw new Error()
}

>>>>>>> bc9a0fcdb58e080516f97f067b0207f7887c7881
module.exports = {
    findAllEbooks,
    findById,
    findOneEbookByTitle
}