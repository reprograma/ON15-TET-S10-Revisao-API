const { request, response } = require('../app')
const livrosModel = require('../models/livrosModels.json')

const findAllEbooks = (req, res) => {
    /**
     * find -> encontrar
     * All -> todos
     * Ebooks -> recurso
     */
   res.status(200).json({
       "message": "retornando todos os livros",
        "livros": livrosModel
   })
}

const findById = (req, res) => {
    const id = req.params.id
    // const findEbook = livrosModel[id] 
    try {
        const findEbook = livrosModel.find(ebook => ebook.id == id)// null | ebook
        
        if (!findEbook) throw new Error(`desculpa, não foi possivel encontrar o livro com o id ${id}`)

        res.status(200).json(findEbook)

    } catch (error) {
        res.status(404).json({
            message: "Poxa, desculpa, foi mal, ainda não possuimos esse livro no nosso catálago.",
            details: error.message,
        })
    }
}

const findOneByTitle =(request, response) =>{
    const {title} = request.query.title
    try {
        if(!title) throw new Error (" Nenhum parametro inserido para busca")
        const findAllEbooks = livrosModel.find(currentEbook => currentEbook.titulo ==title)
        if(!findAllEbooks) throw new Error ("desculpa, nao foi possivel encontrar esse titulo")
    }catch (error) {

    }
}
module.exports = {
    findAllEbooks,
    findById,
    findOneByTitle
}