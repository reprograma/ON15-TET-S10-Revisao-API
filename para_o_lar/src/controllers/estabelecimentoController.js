const estabelecimentoModel = require('../models/estabelecimentos.json')

const findAllLocations = (req, res) => {

    const { nome = null, endereço = null, bairro = null, cidade = null } = req.query

    try{
        let filterLocations = estabelecimentoModel.slice()
        
        if (filterLocations.length === 0) {
            return res.status(200).json({
                message: "Ainda não possuimos estabelecimentos cadastrados em nossa aplicativo"
            })
        }

        if (nome) {
            filterLocations= filterLocations.filter(currentLocations => currentLocations.nome.toLocaleLowerCase()
                .includes(nome.toLocaleLowerCase())
            )
        }

        if (endereço) {
            filterLocations= filterLocations.filter(currentLocations => currentLocations.endereço.toLocaleLowerCase()
                .includes(endereço.toLocaleLowerCase())
            )
        }

        if (bairro) {
            filterLocations= filterLocations.filter(currentLocations => currentLocations.bairro.toLocaleLowerCase()
                .includes(bairro.toLocaleLowerCase())
            )
        }

        if (cidade) {
            filterLocations= filterLocations.filter(currentLocations => currentLocations.cidade.toLocaleLowerCase()
                .includes(cidade.toLocaleLowerCase())
            )
        }

        if (filterLocations.length === 0) {
            throw new Error("descupa, mas não foi encontrado nenhum resultado para essa busca")
        }

        res.status(200).json(filterLocations)

    } catch (error){
        console.error(error)
        console.log('query recebida: ', req.query)

        res.status(404).json({
            message: error.message,
            details: "query invalida: ",
            query: req.query
        })

    }

}

const findById = (req, res) => {
    const { id } = req.params
    
    try {
        const findLotions = estabelecimentoModel.find(locations => locations.id == id)

        if (!findLotions) throw new Error(`desculpa, não foi possivel encontrar o estabelecimento com o id ${id}`)

        res.status(200).json(findLotions)

    } catch (error) {
        console.error(error)
        res.status(404).json({
            message: "Poxa, desculpa, foi mal, ainda não possuimos esse estabelecimento no nosso aplicativo.",
            details: error.message,
        })
    }
}

const findOneLotionsByName = (req, res) => {
    
   const { nome= '"vazio"' } = req.query

    try {

        if (!nome) throw new Error("Nenhum parametro inserido para relizar a busca")

        const findLotions = estabelecimentoModel
            .find(currentLocations => currentLocations.nome.toLocaleLowerCase() == nome.toLocaleLowerCase())

        if (!findLotions) throw new Error(`desculpa, não foi possivel encontrar o estabelecimento com esse nome ${nome}`)

        res.status(200).json(findLotions)

    } catch (error) {
        console.error(error)
        res.status(404).json({
            "message": "desculpa, ainda não possuimos estabelecimento com esse nome",
            "details": error.message
        })
    }
}

const createLotions = (req, res) => {
    const { likes, nome, endereço, numero, bairro, cidade, telefone, pagamento, site } = req.body

    try {

        const id = (estabelecimentoModel.length) + 1

        if (nome === null || nome === undefined || nome.trim() == "") {
            throw {
                
            }
        }

        const findELotionsByName = estabelecimentoModel
            .find(Lotions=> Lotions.nome.toLocaleLowerCase() == nome.toLocaleLowerCase())

        if (
            findELotionsByName &&
            findELotionsByName.site.toLocaleLowerCase() == site.toLocaleLowerCase()
        ) {
            throw {
                statusCode: 409,
                message: "Já existe um estabelecimento com o mesmo nome e site.",
                details: "já existe no sistema um estabelecimento com o mesmo nome e site"
            }
        }

        const newLotions = { ikes, nome, endereço, numero, bairro, cidade, telefone, pagamento, site  }

        console.log(newLotions)

        estabelecimentoModel.push(newLotions)

        console.table(livrosModel)

        res.status(201).json(newLotions)

    } catch (error) {
        if (error.statusCode) res.status(error.statusCode).json(error)
        else res.status(500).json({ "message" : error.message })
    }
}

module.exports = {
    findAllLocations,
    findById,
    findOneLotionsByName,
    createLotions
}