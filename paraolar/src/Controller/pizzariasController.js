
 const { response } = require('express')
const { request } = require('../app')
const pizzariasModels = require('../Models/pizzariasModel.json')


 const getAllPizzarias = async (request, response) => {
   
    response.status(200).send(pizzariasModels)

 }

     const getById = async (request, response) => {
      let idRequest = request.params.id  
      let pizzariaEcontrada = pizzariasModels.find(pizzarias=> pizzarias.id== idRequest ) 
      
         response.status(200).send(pizzariaEcontrada)
     }

     const getByName = async(request, response) =>{
     let nomeRequest = request.query.nome.toLowerCase()
    let pizzariaPorNome = pizzariasModels.filter(pizzarias => pizzarias.nome.toLowerCase().includes(nomeRequest)) 
        
            response.status(200).send(pizzariaPorNome) 
     }

    const getByAdress = async (request, response) => {
       let endereçoRequest = request.query.endereço.toLowerCase() 
       let EnderecoPizzarias = pizzariasModels.filter(pizzarias => pizzarias.endereco.toLowerCase().includes(endereçoRequest))

       response.status(200).send(EnderecoPizzarias)
    }
 
    const getByContact = async (request, request) => {
        let contatoRequest = request.query.contato.toLowerCase()
        let contatoPizzaria = pizzariasModels.filter(pizzarias => pizzarias.contato.toLowerCase().includes(contatoRequest))

        response.status(200).send(contatoPizzaria)
    }
    

const createPizzaria = async(request, response)=>{
     let bodyRequest = request.body

     let novaPizzaria = {
        id: (pizzariasModels.length)+1, 
        name: bodyRequest.name, 
         endereço: bodyRequest.endereço,
         contato :bodyRequest.contato,
         sabores: bodyRequest.sabores
     }
     pizzariasModels.push(novaPizzaria)
    
     response.status(201).json({
        "mensagem": "pizzaria cadastrada com sucesso",
         novaPizzaria
     })
 }
 module.exports = {
     getAllPizzarias,
     getById,
     createPizzaria,
     getByName,
     getByAdress,
    getByContact 

 }