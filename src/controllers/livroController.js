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
                .includes(title.toLocaleLowerCase()
            )
            )
        }

        if (filterEbooks.lenght === 0) {
            throw new Error("Desculpa, não foi encontrado nenhum resultado para essa busca")
        }

        res.status(200).json(filterEbooks)

    } catch (error) {
        console.error(error)
        console.log('query recebida: ', req.query)
        res.status(404).json({
            message: error.message,
            details: "Não foi possível encontrar um resultado para essa query"
        })
    }
}

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
        })
    }
}

module.exports = {
    findAllEbooks,
    findById,
    findOneEbookByTitle
}