const restaurantesModel = require("../models/restaurantesModels.json");

const findAllRestaurants = (request, response) => {

    const { name = null, stars = null, specialty = null, serviceType = null, deliveryTime = null, paymentOptions = null, 
            deliveryFee = null, description = null } = request.query

    try {
        let filterRestaurants = restaurantesModel.slice();

        if (filterRestaurants.length === 0) {
            return response.status(200).json({
                message: "Ainda não possuímos restaurantes cadastrados em nosso sistema."
            })
        };

        if (name) {
            filterRestaurants = filterRestaurants.filter(currentRestaurant => currentRestaurant
                .nome
                .toLocaleLowerCase()
                .includes(name.toLocaleLowerCase())
            )
        };


        if (stars) {
            filterRestaurants = filterRestaurants.filter(currentRestaurant => currentRestaurant
                .estrelas >= stars

            )
        };

        if (specialty) {
            filterRestaurants = filterRestaurants.filter(currentRestaurant => currentRestaurant
                .especialidade
                .toString()
                .toLocaleLowerCase()
                .includes(specialty.toLocaleLowerCase())
            )
        };

        if (serviceType) {
            filterRestaurants = filterRestaurants.filter(currentRestaurant => currentRestaurant
                .tipoDeServico
                .toString()
                .toLocaleLowerCase()
                .includes(serviceType.toLocaleLowerCase())
            )
        };

        if (deliveryTime) {
            filterRestaurants = filterRestaurants.filter(currentRestaurant => currentRestaurant
                .tempoDeEntrega <= deliveryTime

            )
        };

        if (paymentOptions) {
            filterRestaurants = filterRestaurants.filter(currentRestaurant => currentRestaurant
                .pagamento
                .toString()
                .toLocaleLowerCase()
                .includes(paymentOptions.toLocaleLowerCase())
            )
        };


        if (deliveryFee) {
            filterRestaurants = filterRestaurants.filter(currentRestaurant => currentRestaurant
                .taxaDeEntrega <= deliveryFee

            )
        };

        if (description) {
            filterRestaurants = filterRestaurants.filter(currentRestaurant => currentRestaurant
                .sobre
                .toLocaleLowerCase()
                .includes(description.toLocaleLowerCase())

            )
        };

        if (filterRestaurants.length === 0) {
            throw new Error("Não foi possível encontrar resultados com a busca realizada")
        };

        response.status(200).json({
            "Busca por:": request.query,
            "Restaurantes encontrados": filterRestaurants.length,
            "Lista de restaurantes": filterRestaurants
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
        const findRestaurants = restaurantesModel.find(restaurant => restaurant.id == id);

        if (!findRestaurants) throw new Error(`Oh não! Não encontramos restaurantes com o id: ${id}`);

        response.status(200).json({ "Restaurante encontrado": findRestaurants });

    } catch (error) {
        console.error(error)
        response.status(404).json({
            message: "Ainda não possuímos esse restaurante cadastrado em nosso sistema.",
            details: error.message,
        });
    }
};

const findByName = (request, response) => {
    const { name = null } = request.query

    try {
        let filterRestaurants = restaurantesModel.slice();

        if (name) {
            filterRestaurants = filterRestaurants.filter(currentRestaurant => currentRestaurant
                .nome
                .toLocaleLowerCase()
                .includes(name.toLocaleLowerCase())
            )
        };

        if (filterRestaurants.length === 0) {
            throw new Error("Não foi possível encontrar resultados com a busca realizada");
        };

        response.status(200).json({
            "Busca por:": request.query,
            "Restaurantes encontrados": filterRestaurants.length,
            "Lista de restaurantes": filterRestaurants
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

const organizeAllByStar = (request, response) => {
    const { stars = null, name = null } = request.query

    try {
        let filterRestaurants = restaurantesModel.slice();

        filterRestaurants.sort(function (a, b) {
            if (a.estrelas < b.estrelas) {
                return 1;
            }
            if (a.estrelas > b.estrelas) {
                return -1;
            }
            return 0;
        });

        let restaurantStars = []

        for (let i = 0; i < filterRestaurants.length; i++) {
            let estrela = filterRestaurants[i].estrelas
            let nomes = filterRestaurants[i].nome

            if (!name && !stars) {
                restaurantStars.push({
                    "Nome": nomes,
                    "Estrelas": estrela.toFixed(1)
                });

            } if (name && stars) {
                if (nomes.toLocaleLowerCase().includes(name.toLocaleLowerCase()) && estrela >= stars) {
                    restaurantStars.push({
                        "Nome": nomes,
                        "Estrelas": estrela.toFixed(1)
                    });
                };

            } if (name && !stars) {
                if (nomes.toLocaleLowerCase().includes(name.toLocaleLowerCase())) {
                    restaurantStars.push({
                        "Nome": nomes,
                        "Estrelas": estrela.toFixed(1)
                    });
                };
            };

            if (stars && !name) {
                if (estrela >= stars) {
                    restaurantStars.push({
                        "Nome": nomes,
                        "Estrelas": estrela.toFixed(1)
                    });
                };
            };

        };

        if (restaurantStars.length === 0) {
            throw new Error("Não foi possível encontrar resultados com a busca realizada")
        };

        response.status(200).json({
            "Busca por:": request.query,
            "Restaurantes encontrados": restaurantStars.length,
            "Restaurantes ordenados por estrela": restaurantStars
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

const getAllWithDescription = (request, response) => {
    const { description = null, name = null } = request.query

    try {
        let filterRestaurants = restaurantesModel.slice();

        let allAbout = []
        for (let i = 0; i < filterRestaurants.length; i++) {
            let descricao = filterRestaurants[i].sobre
            let nomes = filterRestaurants[i].nome

            if (!description && !name) {
                allAbout.push({
                    "nome": nomes,
                    "sobre": descricao
                });
            }

            if (description && name) {
                if (descricao.toLocaleLowerCase().includes(description.toLocaleLowerCase())
                    && nomes.toLocaleLowerCase().includes(name.toLocaleLowerCase())) {
                    allAbout.push({
                        "nome": nomes,
                        "sobre": descricao
                    });
                };
            };

            if (description && !name) {
                if (descricao.toLocaleLowerCase().includes(description.toLocaleLowerCase())) {
                    allAbout.push({
                        "nome": nomes,
                        "sobre": descricao
                    });
                };

            } if (name && !description) {
                if (nomes.toLocaleLowerCase().includes(name.toLocaleLowerCase())) {
                    allAbout.push({
                        "nome": nomes,
                        "sobre": descricao
                    });
                };
            };
        };

        if (allAbout.length === 0) {
            throw {
                statusCode: 404,
                message: "Não foi possível encontrar resultados com a busca realizada",
                details: "busca inválida:",
                query: request.query
            };
        };

        response.status(200).json({
            "Busca por:": request.query,
            "Restaurantes encontrados": allAbout.length,
            "Lista de restaurantes": allAbout
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

const getAllWithPhone = (request, response) => {
    const { name = null } = request.query
    try {
        let filterRestaurants = restaurantesModel.slice();

        let telefones = []
        for (let i = 0; i < filterRestaurants.length; i++) {
            let telefone = filterRestaurants[i].telefone
            let nomes = filterRestaurants[i].nome

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
            "Restaurantes encontrados": telefones.length,
            "Lista de restaurantes": telefones
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
    const { name = null } = request.query
    try {
        let filterRestaurants = restaurantesModel.slice();

        let adresses = []

        for (let i = 0; i < filterRestaurants.length; i++) {
            let enderecos = filterRestaurants[i].endereco
            let nomes = filterRestaurants[i].nome

            if (name) {
                if (nomes.toLocaleLowerCase().includes(name.toLocaleLowerCase())) {
                    adresses.push({
                        "Nome": nomes,
                        "Endereço": enderecos
                    });
                };

            } else {
                adresses.push({
                    "Nome": nomes,
                    "Endereço": enderecos
                });
            };
        };

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
            "Restaurantes encontrados": adresses.length,
            "Lista de restaurantes": adresses
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


const getAllWithSpecialty = (request, response) => {
    const { specialty = null, name = null } = request.query
    try {
        let filterRestaurants = restaurantesModel.slice();

        let specialties = []

        for (let i = 0; i < filterRestaurants.length; i++) {
            let especiais = filterRestaurants[i].especialidade
            let nomes = filterRestaurants[i].nome

            if (!specialty && !name) {
                specialties.push({
                    "Nome": nomes,
                    "Especialidades": especiais
                });

            } if (specialty && name) {
                if (especiais.toString().toLocaleLowerCase().includes(specialty.toLocaleLowerCase())
                    && nomes.toString().toLocaleLowerCase().includes(name.toLocaleLowerCase())) {

                    specialties.push({
                        "Nome": nomes,
                        "Especialidades": especiais
                    });
                };
            };

            if (specialty && !name) {
                if (especiais.toString().toLocaleLowerCase().includes(specialty.toLocaleLowerCase())) {
                    specialties.push({
                        "Nome": nomes,
                        "Especialidades": especiais
                    })
                }
            }

            if (!specialty && name) {
                if (nomes.toString().toLocaleLowerCase().includes(name.toLocaleLowerCase())) {
                    specialties.push({
                        "Nome": nomes,
                        "Especialidades": especiais
                    });
                };

            };
        };

        if (specialties.length === 0) {
            throw {
                statusCode: 404,
                message: "Não foi possível encontrar resultados com a busca realizada",
                details: "busca inválida:",
                query: request.query
            };
        };

        response.status(200).json({
            "Busca por:": request.query,
            "Restaurantes encontrados": specialties.length,
            "Lista de restaurantes": specialties
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

const getAllWithServiceType = (request, response) => {
    const { serviceType = null, name = null } = request.query
    try {
        let filterRestaurants = restaurantesModel.slice();

        let services = []

        for (let i = 0; i < filterRestaurants.length; i++) {
            let servicos = filterRestaurants[i].tipoDeServico
            let nomes = filterRestaurants[i].nome

            if (!serviceType && !name) {
                services.push({
                    "Nome": nomes,
                    "Tipos de serviço": servicos
                });

            }

            if (serviceType && name) {
                if (servicos.toString().toLocaleLowerCase().includes(serviceType.toLocaleLowerCase())
                    && nomes.toString().toLocaleLowerCase().includes(name.toLocaleLowerCase())) {

                    services.push({
                        "Nome": nomes,
                        "Tipos de serviço": servicos
                    });
                };
            };

            if (serviceType && !name) {
                if (servicos.toString().toLocaleLowerCase().includes(serviceType.toLocaleLowerCase())) {
                    services.push({
                        "Nome": nomes,
                        "Tipos de serviço": servicos
                    });
                };
            };

            if (!serviceType && name) {
                if (nomes.toString().toLocaleLowerCase().includes(name.toLocaleLowerCase())) {
                    services.push({
                        "Nome": nomes,
                        "Tipos de serviço": servicos
                    });
                };

            };
        };

        if (services.length === 0) {
            throw {
                statusCode: 404,
                message: "Não foi possível encontrar resultados com a busca realizada",
                details: "busca inválida:",
                query: request.query
            };
        };

        response.status(200).json({
            "Busca por:": request.query,
            "Restaurantes encontrados": services.length,
            "Lista de restaurantes": services
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

const getAllWithOpeningHours = (request, response) => {
    const { openingHours = null, closingHours = null, name = null } = request.query
    try {
        let filterRestaurants = restaurantesModel.slice();


        let hours = []

        for (let i = 0; i < filterRestaurants.length; i++) {
            let horarios = filterRestaurants[i].horarioDeFuncionamento
            let nomes = filterRestaurants[i].nome

            if (!openingHours && !closingHours && !name) {
                hours.push({
                    "Nome": nomes,
                    "Horário de funcionamento": {
                        "abertura": horarios.abertura.toFixed(2).replace(".", ":"),
                        "fechamento": horarios.fechamento.toFixed(2).replace(".", ":")
                    }
                });
            };

            if (openingHours && closingHours && name) {
                if (nomes.toString().toLocaleLowerCase().includes(name.toLocaleLowerCase())
                    && horarios.fechamento <= closingHours && horarios.abertura <= openingHours)

                    hours.push({
                        "Nome": nomes,
                        "Horário de funcionamento": {
                            "abertura": horarios.abertura.toFixed(2).replace(".", ":"),
                            "fechamento": horarios.fechamento.toFixed(2).replace(".", ":")
                        }
                    });
            };

            if (openingHours && closingHours && !name) {
                if (horarios.fechamento <= closingHours && horarios.abertura <= openingHours)
                    hours.push({
                        "Nome": nomes,
                        "Horário de funcionamento": {
                            "abertura": horarios.abertura.toFixed(2).replace(".", ":"),
                            "fechamento": horarios.fechamento.toFixed(2).replace(".", ":")
                        }
                    });
            };

            if (openingHours && !closingHours && name) {
                if (nomes.toString().toLocaleLowerCase().includes(name.toLocaleLowerCase()) && horarios.abertura <= openingHours)
                    hours.push({
                        "Nome": nomes,
                        "Horário de funcionamento": {
                            "abertura": horarios.abertura.toFixed(2).replace(".", ":"),
                            "fechamento": horarios.fechamento.toFixed(2).replace(".", ":")
                        }
                    });
            };

            if (!openingHours && closingHours && name) {
                if (nomes.toString().toLocaleLowerCase().includes(name.toLocaleLowerCase()) && horarios.fechamento <= closingHours)
                    hours.push({
                        "Nome": nomes,
                        "Horário de funcionamento": {
                            "abertura": horarios.abertura.toFixed(2).replace(".", ":"),
                            "fechamento": horarios.fechamento.toFixed(2).replace(".", ":")
                        }
                    });
            };

            if (openingHours && !closingHours && !name) {
                if (horarios.abertura <= openingHours)
                    hours.push({
                        "Nome": nomes,
                        "Horário de funcionamento": {
                            "abertura": horarios.abertura.toFixed(2).replace(".", ":"),
                            "fechamento": horarios.fechamento.toFixed(2).replace(".", ":")
                        }
                    });
            };

            if (!openingHours && closingHours && !name) {
                if (horarios.fechamento <= closingHours)
                    hours.push({
                        "Nome": nomes,
                        "Horário de funcionamento": {
                            "abertura": horarios.abertura.toFixed(2).replace(".", ":"),
                            "fechamento": horarios.fechamento.toFixed(2).replace(".", ":")
                        }
                    });
            };

            if (!openingHours && !closingHours && name) {
                if (nomes.toString().toLocaleLowerCase().includes(name.toLocaleLowerCase()))
                    hours.push({
                        "Nome": nomes,
                        "Horário de funcionamento": {
                            "abertura": horarios.abertura.toFixed(2).replace(".", ":"),
                            "fechamento": horarios.fechamento.toFixed(2).replace(".", ":")
                        }
                    });
            };
        };

        if (hours.length === 0) {
            throw {
                statusCode: 404,
                message: "Não foi possível encontrar resultados com a busca realizada",
                details: "busca inválida:",
                query: request.query
            };
        };

        response.status(200).json({
            "Busca por:": request.query,
            "Restaurantes encontrados": hours.length,
            "Lista de restaurantes": hours
        });

    } catch (error) {
        console.error(error);
        console.log("busca recebida: ", request.query)

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

const organizeAllByDeliveryTime = (request, response) => {
    const { deliveryTime = null, name = null } = request.query

    try {
        let filterRestaurants = restaurantesModel.slice()

        filterRestaurants.sort(function (a, b) {
            if (a.tempoDeEntrega > b.tempoDeEntrega) {
                return 1;
            }
            if (a.tempoDeEntrega < b.tempoDeEntrega) {
                return -1;
            }
            return 0;
        });

        let time = []

        for (let i = 0; i < filterRestaurants.length; i++) {
            let tempos = filterRestaurants[i].tempoDeEntrega
            let nomes = filterRestaurants[i].nome


            if (!deliveryTime && !name) {
                time.push({
                    "Nome": nomes,
                    "Tempo de entrega": tempos + " minutos"
                });
            };

            if (deliveryTime && name) {
                if (nomes.toString().toLocaleLowerCase().includes(name.toLocaleLowerCase()) && tempos <= deliveryTime) {
                    time.push({
                        "Nome": nomes,
                        "Tempo de entrega": tempos + " minutos"
                    });

                };
            };

            if (deliveryTime && !name) {
                if (tempos <= deliveryTime) {
                    time.push({
                        "Nome": nomes,
                        "Tempo de entrega": tempos + " minutos"
                    });
                };
            };

            if (!deliveryTime && name) {
                if (nomes.toString().toLocaleLowerCase().includes(name.toLocaleLowerCase())) {
                    time.push({
                        "Nome": nomes,
                        "Tempo de entrega": tempos + " minutos"
                    });

                };
            };

        };

        if (time.length === 0) {
            throw {
                statusCode: 404,
                message: "Não foi possível encontrar resultados com a busca realizada",
                details: "busca inválida:",
                query: request.query
            };
        };

        response.status(200).json({
            "Busca por:": request.query,
            "Restaurantes encontrados": time.length,
            "Lista de restaurantes": time
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
                })
            };
        };
    };
};

const getAllWithPaymentOptions = (request, response) => {
    const { paymentOptions = null, name = null } = request.query
    try {
        let filterRestaurants = restaurantesModel.slice();

        let payment = []

        for (let i = 0; i < filterRestaurants.length; i++) {
            let pagamentos = filterRestaurants[i].pagamento
            let nomes = filterRestaurants[i].nome


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
            "Restaurantes encontrados": payment.length,
            "Lista de restaurantes": payment
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

const showAllMenus = (request, response) => {
    const { dish = null, ingredients = null, name = null } = request.query

    try {
        let filterRestaurants = restaurantesModel.slice();


        let menu = []


        for (let i = 0; i < filterRestaurants.length; i++) {
            let cardapios = filterRestaurants[i].cardapio
            let nomes = filterRestaurants[i].nome

            if (!dish && !name && !ingredients) {
                menu.push({
                    "Nome": nomes,
                    "cardápio": cardapios
                });

            };

            if (!dish && name && !ingredients) {
                if (nomes.toString().toLocaleLowerCase().includes(name.toLocaleLowerCase())) {
                    menu.push({
                        "Nome": nomes,
                        "cardápio": cardapios
                    });

                };
            };


            for (let j = 0; j < cardapios.length; j++) {


                let pratos = cardapios[j].prato
                let ingredientes = cardapios[j].Ingredientes

                if (dish && name && ingredients) {
                    if (nomes.toString().toLocaleLowerCase().includes(name.toLocaleLowerCase())
                        && pratos.toString().toLocaleLowerCase().includes(dish.toLocaleLowerCase())
                        && ingredientes.toString().toLocaleLowerCase().includes(ingredients.toLocaleLowerCase())) {

                        menu.push({
                            "Nome": nomes,
                            "cardápio": cardapios[j]
                        });
                    };
                };

                if (dish && !name && ingredients) {
                    if (pratos.toString().toLocaleLowerCase().includes(dish.toLocaleLowerCase())
                        && ingredientes.toString().toLocaleLowerCase().includes(ingredients.toLocaleLowerCase())) {

                        menu.push({
                            "Nome": nomes,
                            "cardápio": cardapios[j]
                        });
                    };
                };

                if (dish && name && !ingredients) {
                    if (nomes.toString().toLocaleLowerCase().includes(name.toLocaleLowerCase())
                        && pratos.toString().toLocaleLowerCase().includes(dish.toLocaleLowerCase())) {

                        menu.push({
                            "Nome": nomes,
                            "cardápio": cardapios[j]
                        });
                    };
                };

                if (!dish && name && ingredients) {
                    if (nomes.toString().toLocaleLowerCase().includes(name.toLocaleLowerCase())
                        && ingredientes.toString().toLocaleLowerCase().includes(ingredients.toLocaleLowerCase())) {

                        menu.push({
                            "Nome": nomes,
                            "cardápio": cardapios[j]
                        });
                    };
                };

                if (dish && !name && !ingredients) {
                    if (pratos.toString().toLocaleLowerCase().includes(dish.toLocaleLowerCase())) {
                        menu.push({
                            "Nome": nomes,
                            "cardápio": cardapios[j]
                        });
                    };
                };

                if (!dish && !name && ingredients) {
                    if (ingredientes.toString().toLocaleLowerCase().includes(ingredients.toLocaleLowerCase())) {
                        menu.push({
                            "Nome": nomes,
                            "cardápio": cardapios[j]
                        });
                    };
                };
            };
        };

        if (menu.length === 0) {
            throw {
                statusCode: 404,
                message: "Não foi possível encontrar resultados com a busca realizada",
                details: "busca inválida:",
                query: request.query
            };
        };

        response.status(200).json({
            "Busca por:": request.query,
            "Lista de restaurantes": menu
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

const findAllByPriceAverage = (request, response) => {
    const { price = null, name = null } = request.query
    try {

        let filterRestaurants = restaurantesModel.slice();

        let prices = []
        let restaurantsAverage = []
        for (let i = 0; i < filterRestaurants.length; i++) {
            let cardapios = filterRestaurants[i].cardapio
            let nomes = filterRestaurants[i].nome
            let itens = []

            for (let j = 0; j < cardapios.length; j++) {
                let preco = cardapios[j].preco

                itens.push(preco);
            }

            prices.push({
                "nome": nomes,
                "valores": itens
            });

        };

        for (i = 0; i < prices.length; i++) {
            let nome = prices[i].nome
            let valor = prices[i].valores
            let average = ((valor.reduce((prev, next) => prev + next)) / valor.length).toFixed(2)

            if (!price && !name) {
                restaurantsAverage.push({
                    restaurante: nome,
                    media: average
                });
            };

            if (price && name) {
                if (nome.toString().toLocaleLowerCase().includes(name.toLocaleLowerCase()) && average <= price) {
                    restaurantsAverage.push({
                        restaurante: nome,
                        media: average
                    });
                };
            };

            if (price && !name) {
                if (average <= price) {
                    restaurantsAverage.push({
                        restaurante: nome,
                        media: average
                    });
                };
            };

            if (!price && name) {
                if (nome.toString().toLocaleLowerCase().includes(name.toLocaleLowerCase())) {
                    restaurantsAverage.push({
                        restaurante: nome,
                        media: average
                    });
                };
            };
        };

        restaurantsAverage.sort(function (a, b) {
            if (a.media > b.media) {
                return 1;
            }
            if (a.media < b.media) {
                return -1;
            }
            return 0;
        })

        let restaurantsByPrice = []

        for (let i = 0; i < restaurantsAverage.length; i++) {
            let nomes = restaurantsAverage[i].restaurante
            let medias = `R$ ${restaurantsAverage[i].media.replace(".", ",")}`
            restaurantsByPrice.push({
                restaurante: nomes,
                media: medias
            });
        };

        if (restaurantsByPrice.length === 0) {
            throw {
                statusCode: 404,
                message: "Não foi possível encontrar resultados com a busca realizada",
                details: "busca inválida:",
                query: request.query
            };
        };

        response.status(200).json({
            "Busca por:": request.query,
            "Restaurantes Encontrados": restaurantsByPrice.length,
            "Lista de restaurantes": restaurantsByPrice
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

const findAllByDeliveryFee = (request, response) => {
    const { deliveryFee = null, name = null } = request.query

    try {
        let filterRestaurants = restaurantesModel.slice();

        filterRestaurants.sort(function (a, b) {
            if (a.taxaDeEntrega > b.taxaDeEntrega) {
                return 1;
            }
            if (a.taxaDeEntrega < b.taxaDeEntrega) {
                return -1;
            }
            return 0;
        });

        let fee = []

        for (let i = 0; i < filterRestaurants.length; i++) {
            let taxas = filterRestaurants[i].taxaDeEntrega
            let nomes = filterRestaurants[i].nome


            if (!deliveryFee && !name) {
                fee.push({
                    "Nome": nomes,
                    "Taxa de entrega": `R$ ${taxas.toFixed(2).replace(".", ",")}`
                });
            };

            if (deliveryFee && name) {
                if (nomes.toString().toLocaleLowerCase().includes(name.toLocaleLowerCase()) && taxas <= deliveryFee) {
                    fee.push({
                        "Nome": nomes,
                        "Taxa de entrega": `R$ ${taxas.toFixed(2).replace(".", ",")}`
                    });
                };
            };

            if (deliveryFee && !name) {
                if (taxas <= deliveryFee) {
                    fee.push({
                        "Nome": nomes,
                        "Taxa de entrega": `R$ ${taxas.toFixed(2).replace(".", ",")}`
                    });
                };
            };

            if (!deliveryFee && name) {
                if (nomes.toString().toLocaleLowerCase().includes(name.toLocaleLowerCase())) {
                    fee.push({
                        "Nome": nomes,
                        "Taxa de entrega": `R$ ${taxas.toFixed(2).replace(".", ",")}`
                    });
                };
            };
        };

        if (fee.length === 0) {
            throw {
                statusCode: 404,
                message: "Não foi possível encontrar resultados com a busca realizada",
                details: "busca inválida:",
                query: request.query
            };
        };

        response.status(200).json({
            "Busca por:": request.query,
            "Restaurantes encontrados": fee.length,
            "Lista de restaurantes": fee
        });

    } catch (error) {
        console.error(error)
        console.log("busca recebida: ", request.query)

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

const findIFood = (request, response) => {
    const { name = null } = request.query

    try {
        let filterRestaurants = restaurantesModel.slice();

        let iFood = []

        for (let i = 0; i < filterRestaurants.length; i++) {
            let restaurantesIFood = filterRestaurants[i].Ifood
            let nomes = filterRestaurants[i].nome

            if (!name) {
                iFood.push({
                    "Nome": nomes,
                    "Restaurante Ifood": restaurantesIFood
                });
            };

            if (name) {
                if (nomes.toString().toLocaleLowerCase().includes(name.toLocaleLowerCase())) {
                    iFood.push({
                        "Nome": nomes,
                        "Restaurante Ifood": restaurantesIFood
                    });
                };
            };
        };

        if (iFood.length === 0) {
            throw {
                statusCode: 404,
                message: "Não foi possível encontrar resultados com a busca realizada",
                details: "busca inválida:",
                query: request.query
            };
        };

        response.status(200).json({
            "Busca por:": request.query,
            "Restaurantes encontrados": iFood.length,
            "Lista de restaurantes": iFood
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

const createNewRestaurant = (request, response) => {
    const { nome, estrelas, sobre, endereco, telefone, especialidade, tipoDeServico,
        horarioDeFuncionamento, tempoDeEntrega, pagamento, cardapio, taxaDeEntrega, Ifood } = request.body

    try {
        let filterRestaurants = restaurantesModel
        const id = filterRestaurants.length + 1

        if (nome === null || nome === undefined || nome.trim() == "") {
            throw {
                statusCode: 406,
                message: `Não foi possível cadastrar restaurante. Nome obrogatório`,
                details: `Para cadastrar restaurante, um nome deve ser inserido.`
            };
        };

        const findRestaurantByName = restaurantesModel
            .find(restaurante => restaurante.nome.toLocaleLowerCase() == nome.toLocaleLowerCase())

        if (findRestaurantByName &&
            findRestaurantByName.telefone.toLocaleLowerCase() == telefone.toLocaleLowerCase()) {
            throw {
                statusCode: 409,
                message: `Não foi possível cadastrar restaurante com o nome: ${nome}. Restaurante já cadastrado.`,
                details: `já existe no sistema um restaurante com o nome: ${nome} e telefone: ${telefone}.`
            };
        };

        const newRestaurant = {
            id, nome, estrelas, sobre, endereco, telefone, especialidade, tipoDeServico,
            horarioDeFuncionamento, tempoDeEntrega, pagamento, cardapio, taxaDeEntrega, Ifood
        };

        const keys = Object.keys(newRestaurant)
        keys.forEach(key => {
            let check = true
            if (!newRestaurant[key]) {
                check = false
                throw {
                    statusCode: 406,
                    message: `Não foi possível cadastrar restaurante: ${nome}. Todos os itens devem ser preenchidos.`,
                    details: `Para a criação de um novo restaurante, é preciso preencher todos os dados.`
                };
            };
        });

        filterRestaurants.push(newRestaurant)
        response.status(201).json({
            "Mensagem": "Restaurante cadastrado com sucesso",
            "Novo restaurante": newRestaurant,
            "Restaurantes cadastrados": filterRestaurants.length,
            "Lista de restaurantes": filterRestaurants
        });

    } catch (error) {

        if (error.statusCode) response.status(error.statusCode).json(error);
        else response.status(500).json({ "message": error.message });

    };
};

const deleteById = (request, response) => {
    const { id } = request.params
    try {

        const findRestaurants = restaurantesModel.find(restaurant => restaurant.id == id);
        const indice = restaurantesModel.indexOf(findRestaurants);
        let restauranteRemovido = restaurantesModel.splice(indice, 1);

        if (findRestaurants == undefined) throw new Error(`Não foi possível deletar restaurante. ID: ${id} não encontrado`);

        response.status(200).send({
            "Mensagem": "Restaurante deletado com sucesso",
            "Restaurante deletado": restauranteRemovido,
            "Lista de restaurantes": restaurantesModel

        });

    } catch (error) {
        console.error(error)
        response.status(404).json({
            message: "Restaurante não removido. Esse restaurante não existe.",
            details: error.message,
        });
    };
};

const updateAll = async (request, response) => {

    try {
        const restaurantes = restaurantesModel
        const idRequest = request.params.id
        const bodyRequest = request.body

        const findRestaurants = restaurantes.find(restaurant => restaurant.id == idRequest);
        const indice = restaurantes.indexOf(findRestaurants);
        bodyRequest.id = idRequest

        restaurantes.splice(indice, 1, bodyRequest);

        if (findRestaurants == undefined) throw new Error(`Não foi possível atualizar restaurante. ID: ${idRequest} não encontrado`);

        response.status(200).json([{
            "Mensagem": "Restaurante atualizado com sucesso",
            "Restaurante atualizado": bodyRequest,
            "Lista de restaurantes": restaurantes
        }]);

    } catch (error) {
        console.error(error)
        response.status(404).json({
            message: "Restaurante não atualizado. Esse restaurante não existe.",
            details: error.message,
        });
    };
};

const updateName = async (request, response) => {
    try {
        const restaurantes = restaurantesModel
        const idRequest = request.params.id
        const newName = request.body.nome

        const findRestaurants = restaurantes.find(restaurant => restaurant.id == idRequest);

        if (findRestaurants == undefined) throw new Error(`Não foi possível atualizar o nome do restaurante solicitado. ID: ${idRequest} não encontrado`);

        findRestaurants.nome = newName

        response.status(200).json([{
            "Mensagem": "Nome atualizado com sucesso",
            "Restaurante atualizado": findRestaurants,
            "Lista de restaurantes": restaurantes
        }]);

    } catch (error) {
        console.error(error)
        response.status(404).json({
            message: "Restaurante não atualizado. Esse restaurante não existe.",
            details: error.message,
        });
    };
};

const updateItems = async (request, response) => {
    try {
        const restaurantes = restaurantesModel
        const idRequest = request.params.id
        const bodyRequest = request.body

        const findRestaurants = restaurantes.find(restaurant => restaurant.id == idRequest);

        if (findRestaurants == undefined) throw new Error(`Não foi possível atualizar o campo escolhido do restaurante solicitado. ID:${idRequest} não encontrado`);

        const itemEncontrado = Object.keys(bodyRequest);

        itemEncontrado.forEach(key => {
            findRestaurants[key] = bodyRequest[key];
        });

        response.status(200).json([{
            "Mensagem": "Restaurante atualizado com sucesso",
            "Restaurante atualizado": findRestaurants,
            "Lista de restaurantes": restaurantes
        }]);

    } catch (error) {
        response.status(404).send({ message: error.message });
    };
};

const giveStars = (request, response) => {

    try {
        const restaurantes = restaurantesModel
        const idRequest = request.params.id
        // const avaliacao = Number(request.query.estrelas)
        const avaliacao = request.body.estrelas

        let novaAvaliacao = []

        const findRestaurants = restaurantes.find(restaurant => restaurant.id == idRequest);

        if (findRestaurants == undefined) throw new Error(`Não foi possível atualizar o nome do restaurante solicitado. ID: ${idRequest} não encontrado`);

        novaAvaliacao.push(findRestaurants.estrelas);
        novaAvaliacao.push(avaliacao);

        let avaliacaoFinal = (novaAvaliacao.reduce((prev, next) => prev + next)) / novaAvaliacao.length
        findRestaurants.estrelas = avaliacaoFinal

        response.status(200).json([{
            "Mensagem": "Restaurante avaliado com sucesso",
            "Avaliação": avaliacao,
            "Restaurante atualizado": findRestaurants,
            "Lista de restaurantes": restaurantes
        }]);

    } catch (error) {
        console.error(error);
        response.status(404).json({
            message: "Restaurante não atualizado. Esse restaurante não existe.",
            details: error.message,
        });
    };
};


module.exports = {
    findAllRestaurants,
    findById,
    findByName,
    organizeAllByStar,
    getAllWithDescription,
    getAllWithPhone,
    getAllWithAdress,
    getAllWithSpecialty,
    getAllWithServiceType,
    getAllWithOpeningHours,
    organizeAllByDeliveryTime,
    getAllWithPaymentOptions,
    showAllMenus,
    findAllByPriceAverage,
    findAllByDeliveryFee,
    findIFood,
    createNewRestaurant,
    deleteById,
    updateAll,
    updateName,
    updateItems,
    giveStars
};