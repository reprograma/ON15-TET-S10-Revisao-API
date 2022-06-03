const shopsModel = require("../models/shopsModels.json")

const findAllShops = (require, response)=>{
    response.status(200).json({
        "mensagem":"lojas encontradas",
        "lojas": shopsModel
    })
}

const findById = (require, response)=>{
    const id = require.params.id
    try {
        const findShops = shopsModel.find(shops => shops.id == id)

        if(!findShops) throw new Error(`Desculpa, não foi possível achar lojas com o id: ${id}. Por favor, tente novamente com um id válido!`)

        response.status(200).json(findShops)
    } catch (error) {
        response.status(404).json({
            message: "Desculpa, ainda não possuímos essa loja!",
            details: error.message,
        })
        
    }
}

const createStore = async(request, response)=>{
    const {nome, endereco, numero, bairro, cidade, telefone, pagamento, site} = request.body

    try {
        const id = shopsModel.length
        if(nome === null || nome === undefined || nome.trim() == "" ){
            throw{

            }
        }

        const findStoreAndress = shopsModel
            .find(store => store.endereco.toLocaleLowerCase() == endereco.toLocaleLowerCase())
                
        if(
            findStoreAndress &&
            findStoreAndress.número == numero &&
            findStoreAndress.bairro == bairro &&
            findStoreAndress.cidade == cidade
        ){
            throw{
                statusCode: 409,
                message: "Já existe uma loja com esse endereço",
                details: "Já existe no sistema uma loja com o mesmo endereço!"

            }
        }

        const telephone = shopsModel(store => store.telefone == telefone)

        if(telephone === null || telephone === undefined || telephone.trim() == "" ){
            throw{

            }
        }

        const payment = shopsModel(store => store.pagamento == pagamento)
        if(pagamento === null || pagamento === undefined || pagamento.trim() == "" ){
            throw{

            }
        }

        const siteStore = shopsModel(store => store.site == site)
        if(site === null || site === undefined || site.trim() == "" ){
            throw{

            }
        }


        //const newStore = {id, nome, endereco, numero, bairro, cidade, telefone, pagamento, site}
        console.log(newStore)

        shopsModel.push(newStore)
        console.table(shopsModel)

        response.status(201).json(newStore)

    } catch (error) {
        
    }

}

module.exports = {
    findAllShops,
    findById,
    createStore,
}