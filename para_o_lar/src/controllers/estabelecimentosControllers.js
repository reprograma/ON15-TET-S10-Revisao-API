const model = require("../model/estabelecimentos.json")

const findAllStore = (request,response) =>{
   try{
    response.status(200).send(model)
    if (model.length == 0) throw new Error(`desculpa,não possuimos estabelecimentos cadastrados ainda`)
   } 
   catch(erro){
    response.status(404).send(erro.message)
   }
}

const findStoreById = (request,response)=>{
    const {id = null}= request.params
    try{
        if(id == null) throw new Error('Não foi inserido nenhum id para ser pesquisado')
        let findStroreId = model.find(strore => strore.id == id)
        if(findStroreId.length == 0) throw new Error("Não foi encontrado nenhuma estabelecimento com esse id")
        response.status(200).send(findStroreId)
    }
    catch(erro){
        response.status(404).send(erro.message)
    }
    

}

const findStoreByQuery = (request,response)=>{
    const { nome = null, bairro = null, cidade = null } = request.query

    try{
        
        if(nome){
            let filtreStore = model.filter( loja => loja.nome.toLocaleLowerCase().includes(nome.toLocaleLowerCase()))
            if(filtreStore.length == 0) throw new Error("Não foi encontrado nenhum estabelecimento com esse nome")
            response.status(200).send(filtreStore)
        }
        if(bairro){
            let filtreStore = model.filter( loja => loja.bairro.toLocaleLowerCase().includes(bairro.toLocaleLowerCase()))
            if(filtreStore.length == 0) throw new Error("Não foi encontrado nenhum estabelecimento com esse bairro")
            response.status(200).send(filtreStore)
        }
        if(cidade){
            let filtreStore = model.filter( loja => loja.cidade.toLocaleLowerCase().includes(cidade.toLocaleLowerCase()))
            if(filtreStore.length == 0) throw new Error("Não foi encontrado nenhum estabelecimento com esse cidade")
            response.status(200).send(filtreStore)
        }

    }
    catch(erro){
        response.status(404).send(erro.message)
    }
}


const createStore = (request,response)=>{
    const {like = 0, nome = null,endereço = null,numero = null,bairro = null,
    cidade = null,telefone = null,pagamento = ["Dinheiro", "pix"],site= nome+".com.br"}= request.body
    const id = model[model.length-1].id+1
    try{
        if(nome == null || nome === undefined || nome.trim() == "")throw new Error("É obrigatorio inserir o nome do estabelecimento")
        let newStore = {
            "id":id,
            "like":like,
            "nome": nome,
            "endereço":endereço,
            "numero":numero,
            "bairro":bairro,
            "cidade":cidade,
            "telefone":telefone,
            "pagamento":pagamento,
            "site":site      
        }
        model.push(newStore)
        response.status(201).send(newStore)
    }
    catch(erro){
        response.status(404).send(erro.message)
    }

}

const updateAddressStore = (request,response)=>{
    const{id=null}= request.params
    const {endereço = null}= request.body
    try{
        if(id == null) throw new Error('Não foi inserido o id da loja que deseja atualizar endereço')
        if(endereço == null) throw new Error('Não foi informando o novo endereço')
        let findStore = model.find(loja => loja.id == id)
        if(findStore.length == 0) throw new Error("Não foi encontrado nenhum estabelecimento com esse id")
        findStore.endereço = endereço
        response.status(200).send(findStore)
    }
    catch(erro){
        response.status(404).send(erro.message)
    }
}


const like = (request,response)=>{
    const {nome = null,likes = null}= request.body
    try{
        if(nome == null)throw new Error('Não foi inserido o  nome da loja que deseja fazer avaliação')
        if(like == null)throw new Error('Não foi informado sua avaliação!')
        if(nome){
           let findStore = model.find( loja => loja.nome.toLocaleLowerCase().includes(nome.toLocaleLowerCase()))
           if(findStore.length == 0) throw new Error("Não foi encontrado nenhum estabelecimento com esse nome")
           findStore.likes +=likes
           response.status(200).send(findStore)
        }
       

    }
    catch(erro){
        response.status(404).send(erro.message)
    }

}

module.exports = {
    findAllStore,
    findStoreByQuery,
    createStore,
    findStoreById,
    updateAddressStore,
    like
}


