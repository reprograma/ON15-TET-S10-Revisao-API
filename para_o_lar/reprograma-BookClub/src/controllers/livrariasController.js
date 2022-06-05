const livrariasModel = require("../models/livrarias.json");

const findAllBookStores = (request, response) => {
    const { name = null, paymentOptions = null, city = null } = request.query

    try {
        let filterBookStores = livrariasModel.slice();

        if (filterBookStores.length === 0) {
            return response.status(200).json({
                message: "Ainda não possuímos livrarias cadastradas em nosso sistema."
            })
        };

        if (name) {
            filterBookStores = filterBookStores.filter(currentBookStore => currentBookStore
                .nome
                .toLocaleLowerCase()
                .includes(name.toLocaleLowerCase())
            )
        };

        if (city) {
            filterBookStores = filterBookStores.filter(currentBookStore => currentBookStore
                .cidade
                .toLocaleLowerCase()
                .includes(city.toLocaleLowerCase())
            )
        };

        if (paymentOptions) {
            filterBookStores = filterBookStores.filter(currentBookStore => currentBookStore
                .pagamento
                .toString()
                .toLocaleLowerCase()
                .includes(paymentOptions.toLocaleLowerCase())
            )
        };

        if (filterBookStores.length === 0) {
            throw new Error("Não foi possível encontrar resultados com a busca realizada")
        };

        response.status(200).json({
            "Busca por:": request.query,
            "Livrarias encontradas": filterBookStores.length,
            "Lista de livrarias": filterBookStores
        });

    } catch (error) {
        console.error(error);
        console.log("busca recebida: ", request.query);

        response.status(404).json({
            message: error.message,
            details: "busca inválida:",
            query: request.query
        });
    }
};

const findById = (request, response) => {
    const { id } = request.params

    try {
        const findBookstore = livrariasModel.find(booskStore => booskStore.id == id);

        if (!findBookstore) throw new Error(`Oh não! Não encontramos livrarias com o id: ${id}`);

        response.status(200).json({ "Livraria encontrada": findBookstore });

    } catch (error) {
        console.error(error)
        response.status(404).json({
            message: "Ainda não possuímos essa livraria cadastrada em nosso sistema.",
            details: error.message,
        });
    }
};

const findByName = (request, response) => {
    const { name = null } = request.query

    try {
        let filterBookStores = livrariasModel.slice();

        if (name) {
            filterBookStores = filterBookStores.filter(booskStore => booskStore
                .nome
                .toLocaleLowerCase()
                .includes(name.toLocaleLowerCase())
            )
        };

        if (filterBookStores.length === 0) {
            throw new Error("Não foi possível encontrar resultados com a busca realizada");
        };

        response.status(200).json({
            "Busca por:": request.query,
            "Livrarias encontradas": filterBookStores.length,
            "Lista de livrarias": filterBookStores
        });

    } catch (error) {
        console.error(error);
        console.log("busca recebida: ", request.query);

        response.status(404).json({
            message: error.message,
            details: "busca inválida:",
            query: request.query
        });
    }
};

const getAllWithPhone = (request, response) => {
    const { name = null } = request.query
    try {
        let filterBookStores = livrariasModel.slice();

        let telefones = []
        for (let i = 0; i < filterBookStores.length; i++) {
            let telefone = filterBookStores[i].telefone
            let nomes = filterBookStores[i].nome

            if (name) {
                if (nomes.toLocaleLowerCase().includes(name.toLocaleLowerCase())) {
                    telefones.push({
                        "Nome": nomes,
                        "Telefone": telefone
                    });
                };

            } else {
                telefones.push({
                    "Nome": nomes,
                    "Telefone": telefone
                });
            };
        };

        if (telefones.length === 0) {
            throw {
                statusCode: 404,
                message: "Não foi possível encontrar resultados com a busca realizada",
                details: "busca inválida:",
                query: request.query
            };
        };

        response.status(200).json({
            "Busca por:": request.query,
            "Livrarias encontradas": telefones.length,
            "Lista de livrarias": telefones
        });

    } catch (error) {
        console.error(error);
        console.log("busca recebida: ", request.query);

        if (error.statusCode) {
            response.status(error.statusCode).json(error);
        }
        else {
            {
                response.status(500).json({
                    message: error.message
                });
            };
        };
    };
};

const getAllWithAdress = (request, response) => {
    const { name = null, city = null } = request.query
    try {
        let filterBookStores = livrariasModel.slice();

        let adresses = []

        for (let i = 0; i < filterBookStores.length; i++) {
            let nomes = filterBookStores[i].nome
            let enderecos = filterBookStores[i].endereço
            let numeros = filterBookStores[i].numero
            let bairros = filterBookStores[i].bairro
            let cidades = filterBookStores[i].cidade

            if (name && city) {
                if (cidades.toLocaleLowerCase().includes(city.toLocaleLowerCase())
                    && nomes.toLocaleLowerCase().includes(name.toLocaleLowerCase())) {
                    adresses.push({
                        "Nome": nomes,
                        "Endereço": enderecos,
                        "Número": numeros,
                        "Bairro": bairros,
                        "Cidade": cidades

                    });
                };
            }
            if (!name && !city) {
                adresses.push({
                    "Nome": nomes,
                    "Endereço": enderecos,
                    "Número": numeros,
                    "Bairro": bairros,
                    "Cidade": cidades

                });
            }

            if (name && !city) {
                if (nomes.toLocaleLowerCase().includes(name.toLocaleLowerCase())) {
                    adresses.push({
                        "Nome": nomes,
                        "Endereço": enderecos,
                        "Número": numeros,
                        "Bairro": bairros,
                        "Cidade": cidades

                    });
                };
            };
            if (!name && city) {
                if (cidades.toLocaleLowerCase().includes(city.toLocaleLowerCase())) {
                    adresses.push({
                        "Nome": nomes,
                        "Endereço": enderecos,
                        "Número": numeros,
                        "Bairro": bairros,
                        "Cidade": cidades

                    });
                };

            };
        }
        if (adresses.length === 0) {
            throw {
                statusCode: 404,
                message: "Não foi possível encontrar resultados com a busca realizada",
                details: "busca inválida:",
                query: request.query
            };
        };

        response.status(200).json({
            "Busca por:": request.query,
            "Livrarias encontradas": adresses.length,
            "Lista de livrarias": adresses
        });

    } catch (error) {
        console.error(error);
        console.log("busca recebida: ", request.query);

        if (error.statusCode) {
            response.status(error.statusCode).json(error);

        } else {
            {
                response.status(500).json({
                    message: error.message
                });
            };
        };
    };
};

const getAllWithPaymentOptions = (request, response) => {
    const { paymentOptions = null, name = null } = request.query
    try {
        let filterBookStores = livrariasModel.slice();

        let payment = []

        for (let i = 0; i < filterBookStores.length; i++) {
            let pagamentos = filterBookStores[i].pagamento
            let nomes = filterBookStores[i].nome


            if (!paymentOptions && !name) {
                payment.push({
                    "Nome": nomes,
                    "Opções de pagamento": pagamentos
                });
            };

            if (paymentOptions && name) {
                if (nomes.toString().toLocaleLowerCase().includes(name.toLocaleLowerCase())
                    && pagamentos.toString().toLocaleLowerCase().includes(paymentOptions.toLocaleLowerCase())) {
                    payment.push({
                        "Nome": nomes,
                        "Opções de pagamento": pagamentos
                    });
                };
            };

            if (paymentOptions && !name) {
                if (pagamentos.toString().toLocaleLowerCase().includes(paymentOptions.toLocaleLowerCase())) {
                    payment.push({
                        "Nome": nomes,
                        "Opções de pagamento": pagamentos
                    });
                };
            };

            if (!paymentOptions && name) {
                if (nomes.toString().toLocaleLowerCase().includes(name.toLocaleLowerCase())) {
                    payment.push({
                        "Nome": nomes,
                        "Opções de pagamento": pagamentos
                    });
                };
            };
        };

        if (payment.length === 0) {
            throw {
                statusCode: 404,
                message: "Não foi possível encontrar resultados com a busca realizada",
                details: "busca inválida:",
                query: request.query
            };
        };

        response.status(200).json({
            "Busca por:": request.query,
            "Livrarias encontradas": payment.length,
            "Lista de livrarias": payment
        });

    } catch (error) {
        console.error(error);
        console.log("busca recebida: ", request.query);

        if (error.statusCode) {
            response.status(error.statusCode).json(error);
        }
        else {
            {
                response.status(500).json({
                    message: error.message
                })
            };
        };
    };
};

const findSite = (request, response) => {
    const { name = null } = request.query

    try {
        let filterBookStores = livrariasModel.slice();

        let site = []

        for (let i = 0; i < filterBookStores.length; i++) {
            let sites = filterBookStores[i].site
            let nomes = filterBookStores[i].nome

            if (!name) {
                site.push({
                    "Nome": nomes,
                    "Site da livraria": sites
                });
            };

            if (name) {
                if (nomes.toString().toLocaleLowerCase().includes(name.toLocaleLowerCase())) {
                    site.push({
                        "Nome": nomes,
                        "Site da livraria": sites
                    });
                };
            };
        };

        if (site.length === 0) {
            throw {
                statusCode: 404,
                message: "Não foi possível encontrar resultados com a busca realizada",
                details: "busca inválida:",
                query: request.query
            };
        };

        response.status(200).json({
            "Busca por:": request.query,
            "Livrarias encontradas": site.length,
            "Lista de livrarias": site
        });

    } catch (error) {
        console.error(error);
        console.log("busca recebida: ", request.query);

        if (error.statusCode) {
            response.status(error.statusCode).json(error);

        } else {
            {
                response.status(500).json({
                    message: error.message
                });
            };
        };
    };
};

const organizeAllLikes = (request, response) => {
    const { likes = null, name = null } = request.query

    try {
        let filterBookStores = livrariasModel.slice();

        filterBookStores.sort(function (a, b) {
            if (a.likes < b.likes) {
                return 1;
            }
            if (a.likes > b.likes) {
                return -1;
            }
            return 0;
        });

        let bookStorelikes = []

        for (let i = 0; i < filterBookStores.length; i++) {
            let like = filterBookStores[i].likes
            let deslike = filterBookStores[i].deslikes
            let nomes = filterBookStores[i].nome

            if (!name && !likes) {
                bookStorelikes.push({
                    "Nome": nomes,
                    "Likes": like,
                    "Deslikes": deslike
                });

            } if (name && likes) {
                if (nomes.toLocaleLowerCase().includes(name.toLocaleLowerCase()) && like >= likes) {
                    bookStorelikes.push({
                        "Nome": nomes,
                        "likes": like,
                        "Deslikes": deslike
                    });
                };

            } if (name && !likes) {
                if (nomes.toLocaleLowerCase().includes(name.toLocaleLowerCase())) {
                    bookStorelikes.push({
                        "Nome": nomes,
                        "likes": like,
                        "Deslikes": deslike
                    });
                };
            };

            if (likes && !name) {
                if (like >= likes) {
                    bookStorelikes.push({
                        "Nome": nomes,
                        "likes": like,
                        "Deslikes": deslike
                    });
                };
            };

        };

        if (bookStorelikes.length === 0) {
            throw new Error("Não foi possível encontrar resultados com a busca realizada")
        };

        response.status(200).json({
            "Busca por:": request.query,
            "Livrarias encontradas": bookStorelikes.length,
            "Livrarias ordenadas por likes": bookStorelikes
        });



    } catch (error) {
        console.error(error);
        console.log("busca recebida: ", request.query);

        response.status(404).json({
            message: error.message,
            details: "busca inválida:",
            query: request.query
        });
    }
};

const createNewBookStore = (request, response) => {
    const { nome, likes, deslikes, endereço, numero, bairro, cidade, telefone, pagamento, site } = request.body

    try {
        let filterBookStores = livrariasModel
        const id = filterBookStores.length + 1

        if (nome === null || nome === undefined || nome.trim() == "") {
            throw {
                statusCode: 406,
                message: `Não foi possível cadastrar livraria. Nome obrigatório`,
                details: `Para cadastrar livraria, um nome deve ser inserido.`
            };
        };

        const findBookStoreByName = livrariasModel
            .find(bookStore => bookStore.nome.toLocaleLowerCase() == nome.toLocaleLowerCase())

        if (findBookStoreByName &&
            findBookStoreByName.telefone.toLocaleLowerCase() == telefone.toLocaleLowerCase()) {
            throw {
                statusCode: 409,
                message: `Não foi possível cadastrar livraria com o nome: ${nome}. Livraria já cadastrada.`,
                details: `já existe no sistema uma livraria com o nome: ${nome} e telefone: ${telefone}.`
            };
        };

        const newBookStore = {
            id, nome, likes, deslikes, endereço, numero, bairro, cidade, telefone, pagamento, site
        };

        const keys = Object.keys(newBookStore)
        keys.forEach(key => {
            let check = true
            if (!newBookStore[key]) {
                check = false
                throw {
                    statusCode: 406,
                    message: `Não foi possível cadastrar livraria: ${nome}. Todos os itens devem ser preenchidos.`,
                    details: `Para a criação de uma nova livraria, é preciso preencher todos os dados.`
                };
            };
        });

        filterBookStores.push(newBookStore)
        response.status(201).json({
            "Mensagem": "Livraria cadastrada com sucesso",
            "Nova livraria": newBookStore,
            "Livrarias cadastradas": filterBookStores.length,
            "Lista de livrarias": filterBookStores
        });

    } catch (error) {

        if (error.statusCode) response.status(error.statusCode).json(error);
        else response.status(500).json({ "message": error.message });

    };
};

const deleteById = (request, response) => {
    const { id } = request.params
    try {

        const findBookStore = livrariasModel.find(bookStore => bookStore.id == id);
        const indice = livrariasModel.indexOf(findBookStore);
        let livrariaRemovida = livrariasModel.splice(indice, 1);

        if (findBookStore == undefined) throw new Error(`Não foi possível deletar livraria. ID: ${id} não encontrado`);

        response.status(200).send({
            "Mensagem": "Livraria deletada com sucesso",
            "Livraria deletada": livrariaRemovida,
            "Lista de livrarias": livrariasModel

        });

    } catch (error) {
        console.error(error)
        response.status(404).json({
            message: "Livraria não removida. Essa livraria não existe.",
            details: error.message,
        });
    };
};

const updateAll = async (request, response) => {

    try {
        const livrarias = livrariasModel
        const idRequest = request.params.id
        const bodyRequest = request.body

        const findBookStore = livrarias.find(bookStore => bookStore.id == idRequest);
        const indice = livrarias.indexOf(findBookStore);
        bodyRequest.id = idRequest

        livrarias.splice(indice, 1, bodyRequest);

        if (findBookStore == undefined) throw new Error(`Não foi possível atualizar livraria. ID: ${idRequest} não encontrado`);

        response.status(200).json([{
            "Mensagem": "Livraria atualizada com sucesso",
            "Livraria atualizada": bodyRequest,
            "Lista de livrarias": livrarias
        }]);

    } catch (error) {
        console.error(error)
        response.status(404).json({
            message: "Livraria não atualizada. Essa livraria não existe.",
            details: error.message,
        });
    };
};

const updateAdress = async (request, response) => {

    try {
        const livrarias = livrariasModel
        const idRequest = request.params.id
        const newStreet = request.body.endereço
        const newNumber = request.body.numero
        const newNeighborhood = request.body.bairro
        const newCity = request.body.cidade

        const bodyRequest = request.body

        const findBookStores = livrarias.find(bookStore => bookStore.id == idRequest);

        if (findBookStores == undefined) throw new Error(`Não foi possível atualizar o endereço da livraria solicitada. ID: ${idRequest} não encontrado`);

        findBookStores.endereço = newStreet
        findBookStores.numero = newNumber
        findBookStores.bairro = newNeighborhood
        findBookStores.cidade = newCity

        response.status(200).json([{
            "Mensagem": "Endereço atualizado com sucesso",
            "Livraria atualizada": findBookStores,
            "Lista de livrarias": livrarias
        }]);

    } catch (error) {
        console.error(error)
        response.status(404).json({
            message: "Livraria não atualizada. Essa livraria não existe.",
            details: error.message,
        });
    };
};

const updateItems = async (request, response) => {
    try {
        const livrarias = livrariasModel
        const idRequest = request.params.id
        const bodyRequest = request.body

        const findBookStores = livrarias.find(bookStore => bookStore.id == idRequest);

        if (livrarias == undefined) throw new Error(`Não foi possível atualizar o campo escolhido da livraria solicitada. ID:${idRequest} não encontrado`);

        const itemEncontrado = Object.keys(bodyRequest);

        itemEncontrado.forEach(key => {
            findBookStores[key] = bodyRequest[key];
        });

        response.status(200).json([{
            "Mensagem": "Item atualizado com sucesso",
            "Livraria atualizada": findBookStores,
            "Lista de livrarias": livrarias
        }]);

    } catch (error) {
        console.error(error)
        response.status(404).json({
            message: "Livraria não atualizada. Essa livraria não existe.",
            details: error.message,
        });
    };
};

const LikeorDeslike = (request, response) => {

    try {

        const livrarias = livrariasModel
        const idRequest = request.params.id
        let like = request.body.likes
        let deslike = request.body.deslikes

        let novoLike = []
        let novoDeslike = []

        const findBookStores = livrarias.find(bookStore => bookStore.id == idRequest);

        if (findBookStores == undefined) throw new Error(`Não foi possível avaliar a livraria solicitada. ID: ${idRequest} não encontrado`);

        novoLike.push(findBookStores.likes);
        novoDeslike.push(findBookStores.deslikes);

        if (!like) like = false
        if (!deslike) deslike = false

        if (deslike && like) {
            throw {
                statusCode: 406,
                message: "Não foi possível avaliar livraria, escolha apenas uma opção.",
                details: "Você deu um like e um deslike na mesma livraria, gostaria de modificar sua avaliação?",
            }
        }

        if (!deslike && !like) {
            throw {
                statusCode: 406,
                message: "Você não gostaria de avaliar essa livraria?",
                details: "Livraria não avaliada."

            }
        }

        if (like) {
            novoLike.push(1)
        }

        if (deslike) {
            novoDeslike.push(1)
        }

        let likeFinal = (novoLike.reduce((prev, next) => prev + next))
        findBookStores.likes = likeFinal
        let deslikeFinal = (novoDeslike.reduce((prev, next) => prev + next))
        findBookStores.deslikes = deslikeFinal

        response.status(200).json([{
            "Mensagem": "Livraria avaliada com sucesso",
            "Likes": like,
            "Deslikes": deslike,
            "Livraria atualizada": findBookStores,
            "Lista de livrarias": livrarias
        }]);

    } catch (error) {
        console.error(error);
        if (error.statusCode) response.status(error.statusCode).json(error);
        else {
            response.status(404).json({
                message: "Livraria não atualizada. Essa livraria não existe.",
                details: error.message,
            });
        }

    };
};

module.exports = {
    findAllBookStores,
    findById,
    findByName,
    getAllWithPhone,
    getAllWithAdress,
    getAllWithPaymentOptions,
    findSite,
    organizeAllLikes,
    createNewBookStore,
    deleteById,
    updateAll,
    updateAdress,
    updateItems,
    LikeorDeslike
};