const estabelecimento = require("../model/estabelecimentos.json")

const getAll = (request, response) => {
    response.status(200).json(estabelecimento)

}

const createEstablishment = (request,response)=>{

    let nomeRequest = request.body.nome
    let enderecoRequest = request.body.endereço
    let numeroRequest = request.body.numero
    let bairroRequest = request.body.bairro
    let cidadeRequest = request.body.cidade
    let telefoneRequest = request.body.telefone
    let pagamentoRequest = request.body.pagamento
    let siteRequest = request.body.site

    

    try {
        let novoestabelecimento = {
            id: (estabelecimento.length)+1, 
            likes: 0,
            deslikes: 0,
            nome: nomeRequest,
            endereço: enderecoRequest,
            numero: numeroRequest,
            bairro: bairroRequest,
            cidade: cidadeRequest,
            telefone:telefoneRequest,
            pagamento:pagamentoRequest,
            site :siteRequest

        }


        if(nomeRequest.trim() == "" || nomeRequest === null || nomeRequest === undefined) throw new Error("você deve preencher todos os campo de em branco, princinpalmente o campo NOME")
        if(enderecoRequest.trim() == "" ||enderecoRequest === null || enderecoRequest === undefined) throw new Error("você deve preencher todos os campo de em branco2, princinpalmente o campo ENDEREÇO")
        if(numeroRequest.trim() == "" || numeroRequest === null || numeroRequest === undefined) throw new Error("você deve preencher todos os campo de em branco, princinpalmente o campo O NÚMERO")
        if(bairroRequest.trim() == "" || bairroRequest === null || bairroRequest === undefined) throw new Error("você deve preencher todos os campo de em branco, princinpalmente o campo BAIRRO")
        if(cidadeRequest.trim() == "" || cidadeRequest === null || cidadeRequest === undefined) throw new Error("você deve preencher todos os campo de em branco , princinpalmente o campo CIDADE")
        if(telefoneRequest.trim() == "" || telefoneRequest === null || telefoneRequest === undefined) throw new Error("você deve preencher todos os campo de em branco, princinpalmente o campo TELEFONE ")
        if(pagamentoRequest == 0 || pagamentoRequest === null || pagamentoRequest === undefined) throw new Error("você deve preencher todos os campo de em branco,  princinpalmente o campo de FORMAS DE PAGAMENTO")
        if(siteRequest.trim() == "" || siteRequest === null || siteRequest === undefined) throw new Error("você deve preencher todos os campo de em branco, , princinpalmente o campo SITE")
        

        for(item of estabelecimento){
            if(item.nome == nomeRequest)throw new Error("não é possivel cadastrar, pois existe um estabelecimento cadastrado com o mesmo nome")

        }


        for(item of estabelecimento){
            if(item.telefone == telefoneRequest)throw new Error("não é possivel cadastrar, pois existe um estabelecimento cadastrado com o mesmo telefone")

        }

        if(pagamentoRequest == "cheque")throw new Error("não é possivel cadastrar, pois não aceitamos cheque como forma de pagamento")
            

        for(item of pagamentoRequest){
            if(item == "cheque")throw new Error("não é possivel cadastrar, pois não aceitamos cheque como forma de pagamento")
            
        }
    
        
        for(item of estabelecimento){
            if(item.site == siteRequest)throw new Error("não é possivel cadastrar, pois existe um estabelecimento cadastrado com o mesmo site")

        }
        
    
        estabelecimento.push(novoestabelecimento) 
        
        response.status(201).send({
            "mensagem": "estabelecimento cadastrado com sucesso"
        })
        
    } catch (error) { 
        response.status(500).json({message:error.message})
        console.log(error)   
    }
    
}
 


module.exports = {
    getAll,
    createEstablishment
}
