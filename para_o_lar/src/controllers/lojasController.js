const lojasModel = require("../model/estabelecimentos.json")

const findAll = (req, res) => {
          
    try {
        let lojaEncontrada = lojasModel.slice()

        if (lojaEncontrada.length===0) throw new Error (`Ainda não possuimos nenhuma loja cadastrada`)
        
        res.status(200).json({
            "message": "LOJAS DE VINIL EM SP",
            "details": lojaEncontrada
        })     
       
    } catch (error) {
        res.status(404).json({
            "message": "Erro no server",
            "details": error.message
        })
    }
}

const findById = (req, res) => {

    const { id } = req.params

    try {
        let lojaEncontrada = lojasModel.find(loja => loja.id == id)

        if (!lojaEncontrada) throw new Error(`Não foi possivel encontrar nenhum estabelecimento com o id ${id}`)
       
        res.status(200).json(lojaEncontrada)

    } catch (error) {
        res.status(404).json({"message": error.message})
    }
}

const findByName = (req, res) => {

    const nameRequest = req.query.name.toLocaleLowerCase()

    try {
        if (nameRequest == 0) throw new Error ("Nenhum dado foi inserido para relizar a busca")
        
        let lojaEncontrada = lojasModel.filter(loja => loja.name.toLocaleLowerCase().includes(nameRequest))
        if (lojaEncontrada == 0) throw new Error (`Não foi possivel encontrar nenhum estabelecimento com o nome inserido`)

            res.status(200).json({ "Loja(s) encontrada(s) na busca": lojaEncontrada})

    } catch (error) {
        res.status(404).json({"message": error.message})
    }
}

const findByDistrict = (req, res) => {

    const districtRequest = req.query.district.toLocaleLowerCase()

    try {
        if (districtRequest == 0) throw new Error ("Nenhum dado foi inserido para relizar a busca")
        
        let lojaEncontrada = lojasModel.filter(loja => loja.district.toLocaleLowerCase().includes(districtRequest))
        if (lojaEncontrada == 0) throw new Error (`Não foi possivel encontrar nenhum estabelecimento no bairro inserido`)

            res.status(200).json({ "Loja(s) encontrada(s) na busca por bairro": lojaEncontrada})

    } catch (error) {
        res.status(404).json({"message": error.message})
    }
}

const updateAll = (req, res) => {
        try {
            const idRequest = req.params.id 
            const bodyRequest = req.body 
    
            const lojaEncontrada = lojasModel.find(loja => loja.id == idRequest)        
                   
            const indice = lojasModel.indexOf(lojaEncontrada)        
            
           // bodyRequest.id = idRequest             
            
            lojasModel.splice(indice, 1, bodyRequest)
            
            // if(bodyRequest.id != idRequest) throw new Error("O Id do estabelecimento é inválido") 
            if (lojaEncontrada == undefined) throw new Error("O Id do estabelecimento é inválido")

            res.status(200).json({
                "message": "Os dados do estabelecimento foram atualizados com sucesso",
                "Loja atualizada": bodyRequest
            })
            
        } catch (error) {
            res.status(404).json({message: error.message}) 
        }   
}


const updateItens = (req,res) => {
    
    try {
        const idRequest = req.params.id
        const bodyRequest = req.body

        let lojaEncontrada = lojasModel.find(loja => loja.id == idRequest)

        if (lojaEncontrada == undefined)
        throw new Error(`Não foi possível atualizar o item inserido.`)
        
        const itemEncontrado = Object.keys(bodyRequest);

        itemEncontrado.forEach(key => {
            lojaEncontrada[key] = bodyRequest[key];
        });

        res.status(200).json({
            "message": "O item inserido foi atualizado com sucesso",
            "Loja atualizada": lojaEncontrada
        })

    } catch(error) {
        res.status(404).json({"message": error.message})
    }
}

const createStore = (req, res) => {
    const { likes, dislikes, name, type, address, number, district, city, hours, site } = req.body 

    try {

        const id = (lojasModel.length)+1

        if (name === null || name === undefined || name.trim() == "") {
            throw {
                statusCode: 400,
                message: "O cadastro falhou. É preciso inserir um nome válido para o estabelecimento",
            }
        }

        //ENCONTRAR LOJA
        const lojaEncontrada = lojasModel.find(loja => loja.name.toLocaleLowerCase() == name.toLocaleLowerCase())

        if (
            lojaEncontrada && lojaEncontrada.address.toLocaleLowerCase() == address.toLocaleLowerCase()
        ) {
            throw {
                statusCode: 409,
                message: "Já existe um estabelecimento cadastrado com o mesmo nome e endereço inserido.",
                details: "Não é possível cadastrar um estabelecimento com as mesmas descrições de outro já existe no sistema"
            }
        }

        const novaLoja = { id, likes, dislikes, name, type, address, number, district, city, hours, site }
        lojasModel.push(novaLoja)

        res.status(201).json({
            "Status da solicitação": "Um novo estabelecimento foi cadastrado com sucesso",
            novaLoja
        })

    } catch (error) {
        if (error.statusCode) res.status(error.statusCode).json(error)
        else res.status(500).json({ "message" : error.message })
    }
}

module.exports = {
    findAll,
    findById,
    findByName,
    findByDistrict,
    updateAll,
    updateItens,
    createStore
}