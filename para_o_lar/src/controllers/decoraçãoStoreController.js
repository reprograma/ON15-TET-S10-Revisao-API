const decoraçãoStore = require('../model/decoraçãoStore.json')

const getAllStore = (request, response) => {
    
    const {nome = null, endereco = null, numero = null, bairro = null, cidade = null, telefone = null, pagamento = null, site = null} = request.query

    try {

        let filterStore = decoraçãoStore.slice()

        if (filterStore.length === 0) {
            return response.status(200).json({
                message: "Ainda não possuimos lojas cadastradas em nosso Sistema."
            })
        }

        if (nome) {
            filterStore = filterStore.filter(currentStore => currentStore
                .nome
                .toLocaleLowerCase()
                .includes(nome.toLocaleLowerCase())
            )
        }

        if (endereco) {
            filterStore = filterStore.filter(currentStore => currentStore
                .endereco
                .toLocaleLowerCase()
                .includes(endereco.toLocaleLowerCase())
            )
        }

        if (numero) {
            filterStore = filterStore.filter(currentStore => currentStore
                .numero
                .toLocaleLowerCase()
                .includes(numero.toLocaleLowerCase())
            )
        }

        if (bairro) {
            filterStore = filterStore.filter(currentStore => currentStore
                .bairro
                .toLocaleLowerCase()
                .includes(bairro.toLocaleLowerCase())
            )
        }

        if (cidade) {
            filterStore = filterStore.filter(currentStore => currentStore
                .cidade
                .toLocaleLowerCase()
                .includes(cidade.toLocaleLowerCase())
            )
        }

        if (telefone) {
            filterStore = filterStore.filter(currentStore => currentStore
                .telefone
                .toLocaleLowerCase()
                .includes(telefone.toLocaleLowerCase())
            )
        }

        if (pagamento) {
            filterStore = filterStore.filter(currentStore => currentStore
                .pagamento
                .toLocaleLowerCase()
                .includes(pagamento.toLocaleLowerCase())
            )
        }

        if (site) {
            filterStore = filterStore.filter(currentStore => currentStore
                .site
                .toLocaleLowerCase()
                .includes(site.toLocaleLowerCase())
            )
        }

        if (filterStore.length === 0) {
            throw new Error("Desculpa, mas não foi encontrado nenhum resultado para essa busca")
        }

        response.status(200).json(filterStore)

    } catch (error) {

        console.error(error)
        console.log('query recebida: ', request.query)

        response.status(404).json({
            message: error.message,
            details: "query invalida: ",
            query: req.query
        })
    }
}

const getById = (request, response) => {

    const { id } = request.params
    
    try {
        const findStore = decoraçãoStore.find(store =>store.id == id)

        if (!findStore) throw new Error(`Não foi possivel encontrar a loja com o id ${id}`)

        response.status(200).json(findStore)

    } catch (error) {
        console.error(error)
        response.status(404).json({
            message: "Ainda não possuimos essa loja no nosso sistema.",
            details: error.message,
        })
    }
}

const getByName = (request, response) => {
    
    const {nome = '"vazio"' } = request.query

    try {

        if (!nome) throw new Error("Nenhum parametro inserido para realizar essa busca")

        const findStore = decoraçãoStore
            .find(currentStore => currentStore.nome.toLocaleLowerCase() == nome.toLocaleLowerCase())

        if (!findStore) throw new Error(`Não foi possivel encontrar a loja com o nome ${nome}`)

        response.status(200).json(findStore)

    } catch (error) {
        console.error(error)
        response.status(404).json({
            "message": "Não possuimos lojas com esse nome",
            "details": error.message
        })
    }
}

const createStore = (request, response) => {

    const {nome, endereco, numero, bairro, cidade, telefone, pagamento, site} = request.body

    try {

        const id = decoraçãoStore.length

        if (nome === null || nome === undefined || nome.trim() == "") {
            throw {
                
            }
        }

        const findStorename = decoraçãoStore
            .find(store => store.nome.toLocaleLowerCase() == nome.toLocaleLowerCase())

        if (
            findStorename &&
            findStorename.endereco.toLocaleLowerCase() == endereco.toLocaleLowerCase()
        ) {
            throw {
                statusCode: 409,
                message: "Já existe uma loja com o mesmo nome e endereço.",
                details: "já existe no sistema uma loja com o mesmo nome e endereço."
            }
        }

        const newStore = {nome, endereco, numero, bairro, cidade, telefone, pagamento, site}

        console.log(newStore)

        decoraçãoStore.push(newStore)

        response.status(201).json(newStore)

    } catch (error) {
        if (error.statusCode) response.status(error.statusCode).json(error)
        else response.status(500).json({ "message" : error.message })
    }
}

const updateEndereco = (request, response) => {

    try {

        const store = decoraçãoStore
        const idRequest = request.params.id
        const newEndereço = request.body.endereço

        const findStore = store.find(store => store.id == idRequest);

        if (findStore == undefined) throw new Error(`Não foi possível atualizar o endereço da loja solicitada.`);

        findStore.endereço = newEndereço

        response.status(200).json([{
            "Mensagem": "Endereço atualizado com sucesso",
            "Endereço atualizado": findStore
            
            
        }]);

    } catch (error) {
        console.error(error)
        response.status(404).json({
            message: "Esse endereço não existe.",
            details: error.message,
        });
    };
};

module.exports = {
    getAllStore,
    getById,
    getByName,
    createStore,
    updateEndereco
}