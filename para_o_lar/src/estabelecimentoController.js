const estabelecimentoModel = require('../model/estabelecimentos.json')
const findAllMembers = (req, res) => {
    const { nome = null, likes = null, endereco = null } = req.query
    try {
        let filterMembers = estabelecimentoModel.slice()
        if (filterMembers.length === 0) {
            return res.status(200).json({
                message: "Ainda não temos nenhum membro cadastrado em nossa Rede."
            })
        }
        if (nome) {
            filterMembers = filterMembers.filter(currentMember => currentMember
                .nome
                .toLocaleLowerCase()
                .includes(autor.toLocaleLowerCase())
            )

        }
        if (filterMembers.length === 0) {
            throw new Error("Desculpa, mas não foi encontrado nenhum resultado para essa busca")
        }
        res.status(200).json(filterEbooks)
    } catch (error) {
        console.error(error)
        console.log('query recebida: ', req.query)
        res.status(404).json({
            message: error.message,
            details: "query invalida",
            query: req.query
        })
    }
}
const findById = (req, res) => {
    const { id } = req.params
    try {
        const findMember = estabelecimentoModel.find(member => member.id == id)
        if (!findMember) throw new Error(`Desculpe, não é possível encontrar este nome com a id ${id}`)

        res.status(200).json(findMember)
    } catch (error) {
        console.error(error)
        res.status(404).json({
            message: "Que pena, ainda não temos este membro cadastrado em nossa Rede. ",
            details: error.message
        })
    }
}
const findOneByName = (req, res) => {
    const { nome = '"vazio"' } = req.query
    try {
        if (!nome) throw new Error("Nenhuma informação foi fornecida para realizar a busca!")

        const findMembers = estabelecimentoModel.find(currentMember => currentMember.nome.toLocaleLowerCase() == nome.toLocaleLowerCase())
        if (!findMembers) throw new Error(`Não foi possível encontrar este nome: ${nome} em nossa lista de membros!`)

        res.status(200).json(findMembers)
    } catch (error) {
        console.error(error)

        res.status(404).json({
            message: "Ainda não temos um membro com este nome em nosso Cadastro",

            "details": error.message,
        })
    }
}
const createMembers = (req, res) => {
    const {
        nome,
        likes,
        endereco
    } = req.body
    try {
        const id = estabelecimentoModel.length
        if (titulo === null || titulo === undefined || titulo.trim() == "") {
            throw {

            }
        }
        const findEstabelecimentoByNome = estabelecimentoModel.find(members => members.nome.toLocaleLowerCase() == nome.toLocaleLowerCase())
        if (
            findEstabelecimentoByNome && findEstabelecimentoByNome.endereco.toLocaleLowerCase() == endereco.toLocaleLowerCase()
        ) {
            throw {
                statusCode: 409,
                message: "Já existe um membro com este nome e endereço, ",
                details: "já existe no sistema um membro com o mesmo nome e endereço!"
            }
        }
        const newMembers = { id, likes, nome, endereco, numero, bairro, cidade, telefone, pagamento, site }
        console.log(newMembers)
        estabelecimentoModel.push(newMembers)
        console.table(estabelecimentoModel)
        res.status(201).json(newMembers)

    } catch (error) {
        if (error.statusCode) res.status(error.statusCode).json(error)
        else res.status(500).json({ "message": error.message })
    }
}
module.exports = {
    findAllMembers,
    findById,
    findOneByName,
    createMembers
}
