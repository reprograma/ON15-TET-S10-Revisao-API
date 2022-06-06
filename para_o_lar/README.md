# Check-In API


> Web API *Check-In* é uma API para cadastro de estabelecimentos de uma cidade fictícia. A ideia central consiste que a API funcione semelhante ao Foursquare, uma plataforma que apresenta informações acerca dos estabelecimentos no entorno, podendo consultar, nome, endereço, site, formas de pagamento.
>
> ## Detalhamento:
>
> Utilizando arquitetura MVC, o projeto é composto pelos diretórios: **controllers, model, routers**, abrigados na pasta principal **src** em conjunto com o **app** para definir padrão de rota e depedências necessárias.
>
>📂 Check-in-API     
├─ 📂 src                       
│  ├─ 📂 controllers            
│  │  └─ checkInController.js          
│  ├─ 📂 models                 
│  │  └─ estabelecimentos.json      
│  ├─ 📂 routes                 
│  │  └─ checkInRouter.js            
│  └─ app.js                 
├─ package-lock.json         
├─ package.json  
├─ README.md             
└─ server.js
>
> ### Rotas:
> Criei o `server.js` utilizando a porta 8080 e testadas no **postman**, então as rotas que realizam o CRUD são:
> <div align = "center">

|  Método  |                  Rota                       |                                Descrição                     |
| :------: | :-------------------------------------:     | :-------------------------------------------------------:    |
|  `GET`   | localhost:8080/check-in/             |                            Página inicial da API       |
|  `GET`   | localhost:8080/check-in/list/          |                                      Retorna todos os estabelecimentos cadastrados, podendo filtrar por query por nome e bairro            |
|  `GET`   | localhost:8080/check-in/list/:id   |                                       Retorna busca pelo id         |
|  `GET`   | localhost:8080/check-in/spotName              |                        Retorna busca por nome do estabelecimento |
|  `GET`   | localhost:8080/check-in/spotPayment             |                         Retorna busca por tipo de pagamento|
|  `POST`   | localhost:8080/check-in/register            |Cadastra um novo estabelecimento    |
|  `DELETE`   | localhost:8080/check-in/delete               |            Deleta um estabelecimento do sistema                 |

<br>
</div>