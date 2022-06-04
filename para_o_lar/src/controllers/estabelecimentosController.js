const { findById } = require('../../../src/controllers/livroController')
const estabelecimentosModel = require('../models/estabelecimentos.json')

const findAllEstabelecimentos = (req, res) => {
    const { nome = null, endereco = null} = req.query

    try {
        let filterEstabelecimentos = estabelecimentosModel.slice()

        if (filterEstabelecimentos.length === 0) {
            return res.status(200).json({
                message: "Esse estabelecimento não foi encontrado!"
            })
        }

        if (nome) {
            filterEstabelecimentos = filterEstabelecimentos.filter(currentEstabelecimento => currentEstabelecimento
                .nome
                .toLowerCase()
                .includes(nome.toLowerCase())
            )
        }

        if (endereco) {
            filterEstabelecimentos = filterEstabelecimentos.filter(currentEstabelecimento => currentEstabelecimento
                .endereco
                .toLowerCase()
                .includes(endereco.toLowerCase())
            )
        }

        if (filterEstabelecimentos.length === 0) {
            throw new Error("Desculpa, nenhum estabelecimento foi encontrado para essa busca!")
        }

        res.status(200).json(filterEstabelecimentos)

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

const findByNome = (req, res) => {
    const nome = req.params.nome
    
    try {
        const findEstabelecimento = estabelecimentosModel.find(currentEstabelecimento => currentEstabelecimento.nome.toLowerCase() == nome.toLowerCase())// null | currentEstabelecimento

        if (!findEstabelecimento) throw new Error(`desculpa, não foi possivel encontrar o estabelecimento com o nome ${nome}`)

        res.status(200).json(findEstabelecimento)

    } catch (error) {
        console.error(error)
        res.status(404).json({
            message: "Desculpa, não conseguimos encontrar esse estabelecimento :(",
            details: error.message,
        })
    }
}

const findByEndereco = (req, res) => {
    const { endereco } = req.params
    
    try {
        const findEstabelecimento = estabelecimentosModel.find(currentEstabelecimento => currentEstabelecimento.endereco.toLowerCase() == endereco.toLowerCase())// null | currentEstabelecimento

        if (!findEstabelecimento) throw new Error(`desculpa, não foi possivel encontrar o estabelecimento com o endereco ${endereco}`)

        res.status(200).json(findEstabelecimento)

    } catch (error) {
        console.error(error)
        res.status(404).json({
            message: "Desculpa, não conseguimos encontrar esse estabelecimento :(",
            details: error.message,
        })
    }
}

const findByTelefone = (req, res) => {
    const { telefone } = req.params
    
    try {
        const findEstabelecimento = estabelecimentosModel.find(currentEstabelecimento => currentEstabelecimento.telefone == telefone)// null | currentEstabelecimento

        if (!findEstabelecimento) throw new Error(`desculpa, não foi possivel encontrar o estabelecimento com o telefone ${telefone}`)

        res.status(200).json(findEstabelecimento)

    } catch (error) {
        console.error(error)
        res.status(404).json({
            message: "Desculpa, não conseguimos encontrar esse estabelecimento :(",
            details: error.message,
        })
    }
}

const updateEsbelecimento = (req, res) => {
    const { nome, endereco, numero, bairro,
        cidade, telefone, pagamento: [], site } = req.body

    try {
        const id = req.params.id
        const likes = req.params.likes

        let estabelecimentoEncontrado = estabelecimentosModel.find(currentEstabelecimento => currentEstabelecimento.id == id)

        estabelecimentoEncontrado = { id, likes, nome, endereco, numero, bairro,
            cidade, telefone, pagamento: [], site }

        res.status(200).json(
            [{
                "mensagem": "Estabelecimento atualizado com sucesso",
                "Estabelecimento": estabelecimentoEncontrado
                }]
        )
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const createEstabelecimento = (req, res) => {
    const { nome, endereco, numero, bairro,
            cidade, telefone, pagamento: [], site } = req.body

    try {

        const id = estabelecimentosModel.length + 1
        const likes = 0

        if (nome === null || nome === undefined || nome.trim() == "") {
            throw {
                
            }
        }

        const findByNome = estabelecimentosModel
            .find(currentEstabelecimento => currentEstabelecimento.nome.toLowerCase() == nome.toLowerCase())

        const findByEndereco = estabelecimentosModel
        .find(currentEstabelecimento => currentEstabelecimento.endereco.toLowerCase() == endereco.toLowerCase())

        const findByTelefone = estabelecimentosModel
            .find(currentEstabelecimento => currentEstabelecimento.telefone == telefone)

        if (
            findByNome && 
            findByNome.nome.toLowerCase() == nome.toLowerCase()
        )

        
        {
            throw {
                statusCode: 409,
                message: "Já existe um estabelecimento com o mesmo nome.",
                details: "já existe no sistema um estabelecimento com o mesmo nome"
            }
        }
        
        if (
            findByEndereco && 
            findByEndereco.endereco.toLowerCase() == endereco.toLowerCase()
        )

        {
            throw {
                statusCode: 409,
                message: "Já existe um estabelecimento com o mesmo endereço.",
                details: "já existe no sistema um estabelecimento com o mesmo endereço"
            }
        }

        if (
            findByTelefone && 
            findByTelefone.telefone == telefone
        )

        {
            throw {
                statusCode: 409,
                message: "Já existe um estabelecimento com o mesmo telefone.",
                details: "já existe no sistema um estabelecimento com o mesmo telefone"
            }
        }


        const newcurrentEstabelecimento = { id, likes, nome, endereco, numero, bairro,
            cidade, telefone, pagamento: [], site }

        console.log(newcurrentEstabelecimento)

        estabelecimentosModel.push(newcurrentEstabelecimento)

        console.table(estabelecimentosModel)

        res.status(201).json(newcurrentEstabelecimento)

    } catch (error) {
        if (error.statusCode) res.status(error.statusCode).json(error)
        else res.status(500).json({ "message" : error.message })
    }
}

module.exports = {
    findAllEstabelecimentos, 
    findByNome,
    findByEndereco,
    findByTelefone,
    createEstabelecimento,
    updateEsbelecimento
}