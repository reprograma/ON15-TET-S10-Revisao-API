const estabelecimentosModel = require('../models/estabelecimentoscontrollers.json')

const findAllEstablishment = (req, res) => {
  
    const { nome = null, endereco = null, numero = null, 
        bairro = null, cidade = null, telefone = null, pagamento = null, site = null } = req.query

    try {
        let filterEstablishment = estabelecimentosModel.slice()

        if (filterEstablishment.length===0) {
            return res.status(200).json({
                message:  "Ainda não possuimos estabelecimentos cadastrados em nossa base"
            })
        }

        if (nome) {
            filterEstablishment = filterEstablishment.filter(currentEstablishment => currentEstablishment
                .nome
                .toLocaleLowerCase()
                .includes(nome.toLocaleLowerCase())
            )
        }

        if (endereco) {
            filterEstablishment = filterEstablishment.filter(currentEstablishment => currentEstablishment
                .endereco
                .toLocaleLowerCase()
                .includes(endereco.toLocaleLowerCase())
            )
        }

        if (filterEstablishment.length === 0) {
            throw new Error("descupa, mas não foi encontrado nenhum resultado para essa busca")
        }

        res.status(200).json(filterEstablishment)

    } catch (error) {
        console.error(error)
        console.log('query recebida: ', req.query)

        res.status(404).json({
            message: error.message,
            details: "query invalida: ",
            query: req.query
        })
    }
}


module.exports = {
    findAllEstablishment,
  
}