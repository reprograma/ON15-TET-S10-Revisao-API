const estabelecimentosModel = require("../model/estabelecimentos.json")

const getAll = (req, res) => {
    res.status(200).send(estabelecimentosModel)
   
}

const showAllEstabelecimentos = (req, res) =>{
    const { id = null, nome = null, bairro = null, site = null} = req.query

    try {
        let filterEstabelcimentos = estabelecimentosModel.slice()

        if(filterEstabelcimentos.length===0) {
            return res.status(200).json({
                message: "Não há nenhum estabelecimento cadastrado"
            })
        }

        if(id) {
            filterEstabelcimentos = filterEstabelcimentos.filter(estabelecimento => estabelecimento.id)
                
        }

        if(nome) {
            filterEstabelcimentos = filterEstabelcimentos.filter(estabelecimento =>estabelecimento
                .nome
                .toLocaleLowerCase()
                .includes(nome.toLocaleLowerCase())
                )
        }

        if(bairro)
        {
            filterEstabelcimentos = filterEstabelcimentos.filter(estabelecimento =>estabelecimento
                .bairro
                .toLocaleLowerCase()
                .includes(bairro.toLocaleLowerCase())
                ) 
        }

        if(site) 
        {
            filterEstabelcimentos = filterEstabelcimentos.filter(estabelecimento =>estabelecimento
                .site
                .toLocaleLowerCase()
                .includes(site.toLocaleLowerCase())
                )   
        }

        if(filterEstabelcimentos.length ===0){
            throw new Error ("Não foi encontrado nenhum estabelecimento com essa busca.")
        }

        res.status(200).json(filterEstabelcimentos)

    } catch (error) {
        console.error(error)
        console.log('procura feita: ', req.query)

        res.status(400).json({
            message: error.message,
            details: "query inválida",
            quer: req.query
        })
    }

}

const createEstabelecimentos = (req, res) => {
    const { nome, bairro, site } = req.body
    try {
        
    const id = estabelecimentosModel.length

    const findEstabelecimentoByNome = estabelecimentosModel
    .find(estabelecimento => estabelecimento.nome.toLocaleLowerCase() == nome.toLocaleLowerCase())

    if(findEstabelecimentoByNome &&
        findEstabelecimentoByNome.bairro.toLocaleLowerCase() == bairro.toLocaleLowerCase()
        ) {
            throw {
                statusCode: 409, 
                    message: "Já existe um estabelecimento com este nome.",
                    details: "Já existe no sistema um estabelecimento com este nome e bairro."
            }
        }

        const newEstabelecimento = {
            id, nome, bairro, site
        }

        estabelecimentosModel.push(newEstabelecimento)

        res.status(201).json(newEstabelecimento)

    } catch (error) {
        if (error.statusCode) res.status(error.statusCode).json(error)
        else res.status(500).json({message: error.message})
    }

}

module.exports = {
    showAllEstabelecimentos,
    createEstabelecimentos,
    getAll


}