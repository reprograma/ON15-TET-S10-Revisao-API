const businessModel = require("../models/businessModels.json")

//porta 8070
const getAll = (req, res) => {
    try {
       
       if(businessModel == undefined || businessModel == null) throw new Error("Estabelecimento não localizado")

       res.status(200).json(businessModel)

    } catch (error) {
        console.error(error)
        res.status(404).json({message: error.message})
    }
}

const getById = (req, res) => {
    try {
        const idRequest = req.params.id
        const findStore = businessModel.find(loja => loja.id == idRequest)

        if(!findStore) throw new Error (`Estabelecimento de iD: ${idRequest} não localizado`)

        res.status(200).json(findStore)
        
    } catch (error) {
        res.status(404).json({
            details: error.message, 
            message: "Id não existe" 
        })
    }
}

const findSome = (req,res) => {
    const { store, type, neighborhood } = req.query

    try {
        let filterStores = businessModel.slice()

        if(store) {
            filterStores = filterStores.filter(business => business.store.toLowerCase().normalize("NFD").replace(/[^a-zA-Zs]/g, "").includes(store.toLowerCase().normalize("NFD").replace(/[^a-zA-Zs]/g, "")))
            
        }

        if(type) {
            filterStores = filterStores.filter(storeType => storeType.type.toString().toLowerCase().includes(type.toLowerCase()))
        }

        if(neighborhood) {
            filterStores = filterStores.filter(storeNeighborhood => storeNeighborhood.neighborhood.toLocaleLowerCase().includes(neighborhood.toLocaleLowerCase()))
        }

        if(filterStores.length === 0) {
            throw new Error("Nenhum estabelecimento foi encontrado")
        }

        res.status(200).json(filterStores)

    } catch (error) {
        console.error(error)
        res.status(404).json({message: error.message})
    }
}

const createStore = (req, res) => {
    //const with items that have to put in the body
    const { store, type, neighborhood, address, number, paymment, site } = req.body
    try {
        const id = businessModel.length
                  
        if(store === null || store === undefined || store.trim() === "") {
            throw {
                statusCode: 400,
                message: "não pode ser criado, pois nome é requerido",
                details: `o nome recebido inválido foi ${store}`
            }
         } 
        
        //search item (store)
        const findBusiness = businessModel.find(establishment => establishment.store.toLowerCase() == store.toLowerCase())

        //and if "store" and "address" of this store are the same, don't accept
        if(findBusiness && findBusiness.address.toLowerCase() == address.toLowerCase()) {
            throw {
                statusCode: 409,
                message: "Já existe um estabelecimento com o mesmo nome e endereço",
                details: "Estabelecimento já existe no sistema"
            }
        }

        
        //const with keys that gonna appear in the body
        const newCommerce = { id, store, type, neighborhood, address, number, paymment, site}        
        businessModel.push(newCommerce)

        const objKeys = Object.keys(newCommerce)
        //if doesn't have all keys
        objKeys.forEach(key => {
            let valide = true
            if(!newCommerce[key] ) {
                valide = false
                throw {
                    statusCode: 406,
                    message: "Todos os itens devem ser adicionados para criação de novo estabelecimento",
                    details: "Estabelecimento incompleto"
                }
            }
            })
        res.status(201).json(newCommerce)   
    }catch (error) {
        if(error.statusCode) res.status(error.statusCode).json(error)
        else res.status(500).json({"message": error.message})
        
    }
}


module.exports = {
    getAll,
    getById,
    findSome,
    createStore
}