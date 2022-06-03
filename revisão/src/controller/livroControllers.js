const livrosModel = require("../models/livrosModels.json")

const findAll = (req, res) => {
    const { title = null, page = null, author = null } = req.query

    try {
        let filterEbooks = livrosModel.slice()

        if(filterEbooks.length === 0) {
            return res.status(200).json({message: "Não temos esse livro no nosso sistema"
            })
        }

        if(author) {
            filterEbooks = filterEbooks.filter(currentEbook => currentEbook.autor.toLocaleLowerCase().includes(author.toLocaleLowerCase()))
        }

        if(title) {
            filterEbooks = filterEbooks.filter(currentEbook => currentEbook.titulo.toLocaleLowerCase().includes(title.toLocaleLowerCase()))
        }

        if(filterEbooks.length === 0) {
            throw new Error("Nenhum livro foi encontrado")
        }
        res.status(200).json(filterEbooks)
    } catch (error) {
        console.error(error)
        res.status(404).json({message: error.message})
        
    }
}

const findById = (req, res) => {
    try {
        const idRequest = req.params.id
        const findEbook = livrosModel.find(livro => livro.id == idRequest)

        if(!findEbook) throw new Error (`Livro de iD: ${idRequest} não localizado`)
        
        res.status(200).json(findEbook)
    } catch (error) {

        res.status(404).json({
            details: error.message, //msg tecnica
            message: "Deu ruim" //msg pro front
        })
    }

}

const findOneEbookByTitle = (req,res) => {
    const { title = "vazio" }= req.query //dessa forma faz referencia ao paramatro do query/params (que seria req.query.title) e retorna para o erro "vazio" de forma explicita
    try {
        if(!title) throw new Error("Nenhum parametro encontrado")

        const findEbook = livrosModel.find(livro => livro.titulo.toLowerCase() == title.toLowerCase())

        if(!findEbook) throw new Error(`Livro de titulo: ${title} não localizado`)

        res.status(200).json(findEbook)
        
    } catch (error) {
        res.status(404).json({
            details: error.message,
            message: "Título não localizado"
        })
    }

}

const createEbook = (req,res) => {
    const { titulo, paginas, autor } = req.body //dessa forma automatiza, diminuindo a quantidade de código.
    try {
        const id = livrosModel.length

        if(titulo === null || titulo === undefined || titulo.trim() == "") {
            throw {
                statusCode: 400,
                message: "não pode ser criado, pois titulo é requerido",
                details: `o titulo recebido inválido foi ${titulo}`
            }
        }

        const findEbookByTitle = livrosModel.find(ebook => ebook.titulo.toLocaleLowerCase() == titulo.toLocaleLowerCase())

        if(findEbookByTitle && findEbookByTitle.autor.toLocaleLowerCase() == autor.toLocaleLowerCase()) {
            throw {
                statusCode: 409,
                message: "Já existe um livro com o mesmo titulo e autor",
                details: "Livro já existe no sistema"
            }
        }

        const newEbook = { id, titulo, paginas, autor} 
        //assim todas as chaves serão consideradas na criação
        livrosModel.push(newEbook)
        res.status(201).json(newEbook)
    } catch (error) {
        if(error.statusCode) res.status(error.statusCode).json(error)
        else res.status(500).json({"message": error.message})
        
    }
}


module.exports = {
    findAll,
    findById,
    findOneEbookByTitle,
    createEbook
}
