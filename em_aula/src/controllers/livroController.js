const livrosModel = require('../models/livrosModels.json')

const findAllEbooks = (req, res) => {
    /**
     * find -> encontrar
     * All -> todos
     * Ebooks -> recurso
     */
    const{ title = null, page = null, autor = null } = req.query

    try {
        let filterEbooks = livrosModel.slice()
        if(filterEbooks.length==0) {
            return res.status(200).json({
                message: "Ainda não possuimos livros cadastrados em nossa biblioteca"
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

        if (filterEbooks.length === 0){
            throw new Error("Desculpa, mas não foi encontrado nenhum resultado para essa busca")
        }

        res.status(200).json(filterEbooks)

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
    // const findEbook = livrosModel[id] 
    try {
        const findEbook = livrosModel.find(ebook => ebook.id == id)// null | ebook
        
        if (!findEbook) throw new Error(`desculpa, não foi possivel encontrar o livro com o id ${id}`)

        res.status(200).json(findEbook)

    } catch (error) {
        console.error(error)
        res.status(404).json({
            "message": "Poxa, desculpa, foi mal, ainda não possuimos esse livro no nosso catálago.",
            "details": error.message,
        })
    }
}

const findOneEbookByAuthorName = (req, res) => {
    // const req.query.authorName
    // authorRequest
    const { authorName } = req.query 

    try {

        if (!authorName) throw new Error("Nenhum parametro inserido para relizar a busca")

        const findEbook = livrosModel.find(currentEbook => currentEbook.autor.toLocaleLowerCase() == authorName)

        if (!findEbook) throw new Error(`desculpa, não foi possivel encontrar o livro com o autor ${authorName}`)

        res.status(200).json(findEbook)

    } catch (error) {
        console.error(error)
        res.status(404).json({
            "message" : "desculpa, ainda não possuimos livros para esse autor",
            "details" : error.message
            
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
        })
    }
}

const createEbook = (req, res) => {
    const { titulo, paginas, autor } = req.body

    try {
        const id = livrosModel.length

        if(titulo === null || titulo === undefined || titulo.trim() == "") {
        throw{
            statusCode: 400,
            message: "Não pode ser criado, pois o título é requerido.", raw,
            details: `O título recebido inválido foi: ${titulo}`
        }
    }

        const findEbookByTitle = livrosModel.find(ebook => ebook.titulo.toLocaleLowerCase() ==titulo.toLocaleLowerCase())

        if(findEbookByTitle && findEbookByTitle.autor.toLocaleLowerCase() == autor.toLocaleLowerCase()) {
            throw {
                statusCode: 409,
                mensage: "Já existe um livro com o mesmo títlo e autor.",
                details :"Já existe no sistema um livro com o mesmo título e autor."
            }
        }

        console.log(id)

        const newEbook = {
                id, titulo, paginas, autor
        }

        console.log(newEbook)

        livrosModel.push(newEbook)

        console.table(livrosModel)

        res.status(201).json(newEbook)

    } catch (error) {
        if(error.statusCode) res.status(error.statusCode).json(error)
        else res.status(500).json({"message" : error.message})
        
    }

}

module.exports = {
    findAllEbooks,
    findById,
    findOneEbookByAuthorName,
    findOneEbookByTitle,
    createEbook
}