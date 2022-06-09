let establishments = require("../models/estabelecimentos.json");

// TODO: cadastrar livraria
// TODO: atualizar endereço de uma livraria
// TODO: dar like
// TODO: dar deslike

const createNewEstablishment = (request, response) => {
    const { nome, endereco, numero, bairro, cidade, telefone, pagamento, site } = request.body

    try {
        const newId = establishments.length

        const findEstablishmentByName = establishments
            .find(establishment => establishment.nome.toLocaleLowerCase() == nome.toLocaleLowerCase())

        if (findEstablishmentByName) {
            throw {
                statusCode: 409,
                message: `Não foi possível cadastrar livraria com o nome: ${nome}. Estabelecimento já cadastrado.`
            };
        };

        const newEstablishment =  {
            "id": newId,
            "likes": 0,
            "deslikes": 0,
            "nome": nome,
            "endereço": endereco,
            "numero": numero,
            "bairro": bairro,
            "cidade": cidade,
            "telefone": telefone,
            "pagamento": pagamento,
            "site" : site
        }    

        establishments.push(newEstablishment)
        response.status(200).json({
            "message": "Estabelecimento cadastrado com sucesso",
        });

    } catch (error) {

        if (error.statusCode) response.status(error.statusCode).json(error);
        else response.status(500).json({ "message": error.message });

    };
};


const updateAdress =  (request, response) => {

    try {
        const livrarias = establishments
        const idRequest = request.params.id
        const newStreet = request.body.endereço
        const newNumber = request.body.numero
        const newNeighborhood = request.body.bairro
        const newCity = request.body.cidade

        const establishment = livrarias.find(establishment => establishment.id == idRequest);

        if (establishment == undefined) throw new Error(`Não foi possível atualizar o endereço da livraria solicitada. ID: ${idRequest} não encontrado`);

        establishment.endereço = newStreet
        establishment.numero = newNumber
        establishment.bairro = newNeighborhood
        establishment.cidade = newCity

        response.status(200).json([{
            "message": "Endereço atualizado com sucesso",
        }]);

    } catch (error) {
        console.error(error)
        response.status(404).json({
            message: "Estabelecimento não atualizado",
            details: error.message,
        });
    };
};

const likeEstablishment = (request, response) => {
    try {

        const idRequest = request.params.id
        
        const establishment = livrarias.find(establishment => establishment.id == idRequest);

        if (establishment == undefined) throw new Error(`Não foi possível avaliar a livraria solicitada. ID: ${idRequest} não encontrado`);

        establishment.likes = establishment.likes + 1

        response.status(200).json([{
            "Mensagem": "Estabelecimento avaliado com sucesso",
        }]);

    } catch (error) {
        console.error(error)
        response.status(404).json({
            message: "Estabelecimento não avaliado",
            details: error.message,
        });
    };
};

const deslikeEstablishment = (request, response) => {
    try {

        const idRequest = request.params.id
        
        const establishment = livrarias.find(establishment => establishment.id == idRequest);

        if (establishment == undefined) throw new Error(`Não foi possível avaliar a livraria solicitada. ID: ${idRequest} não encontrado`);

        establishment.deslikes = establishment.deslikes + 1

        response.status(200).json([{
            "Mensagem": "Estabelecimento avaliado com sucesso",
        }]);

    } catch (error) {
        console.error(error)
        response.status(404).json({
            message: "Estabelecimento não avaliado",
            details: error.message,
        });
    };
};

module.exports = {
    createNewEstablishment,
    updateAdress,
    deslikeEstablishment,
    likeEstablishment
};