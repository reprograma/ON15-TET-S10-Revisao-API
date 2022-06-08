# <div align = "center"> ON15-TET-S10-Revisão </div>

<div align = "center">
    <p>
        Turma Online Todas em Tech - Back-end | Semana 10: Projeto Guiado: revisão <b>CRUD</b>.
    </p>
</div>

<br>
<div align = "center">
<img src='./assets/reprograma-bookclube.jpeg' width = 500 alt = 'logo reprograma book clube'>
</div>
<br>

# {reprograma} Book Club

</div>

<div align = "justify">

A web API **{reprograma} Book Club**, é uma API com cadastros de livrarias, espalhadas pelo Brasil. A ideia do projeto é que essa API seja como uma rede social para amantes de livros, onde livrarias podem ser cadastradas e os usuários poderão consultar as informações das mesmas, fazer atualizações completas, de endereço ou de qualquer outro item, remover livrarias, além de poderem avaliar se gostaram desse estabelecimento (**likes**) ou não (**deslikes**).

</div>


## PROJETO 

<div align = "justify">

Para esse projeto foi criada uma Web API com o tema: [livrarias](https://github.com/BrunaCelestino/ON15-TET-S10-Revisao-API/blob/BrunaCelestino/para_o_lar/reprograma-BookClub/src/models/livrarias.json), sugerido pela professora [Bea Ramerindo](https://github.com/isjanebia), onde constam estabelecimentos fictícios e reais. 

<br>
</div>

### OBJETIVO: 
<div align = "justify">

O objetivo dessa web API é reunir livrarias espalhadas pelo Brasil, tornando possível para os usuários pesquisar informações sobre as mesmas, baseando-se em uma série de parâmetros, utilizando o método **GET**, além de possibilitar o cadastro de novas livrarias, utilizando o método **POST**, deletar cadastros com o método **DELETE**, atualizar livrarias por completo usando **PUT**, atualizar apenas o endereço ou qualquer outro item desejado e avaliar a livraria dando like ou deslike, obtendo um novo número de likes e deslikes, utilizando **PATCH**. 

<br>
</div>

###  ARQUITETURA: 

<div align = "justify">

Esse projeto foi construído utilizando a arquitetura MVC, acrônimo para Model-View-Controller ou, em português, Arquitetura Modelo-Visão-Controle. MVC é um padrão de arquitetura de software, voltado para o reuso de códigos e onde a separação dos mesmos ocorre em três camadas interconectadas. A apresentação dos dados é separada dos métodos que interagem com o banco de dados.

</div>

O servidor, criado dentro da pasta [reprograma-BookClub](https://github.com/BrunaCelestino/ON15-TET-S10-Revisao-API/tree/BrunaCelestino/para-o-lar/reprograma-BookClub), conta com a seguinte estrutura:


```bash
        \--📂 reprograma-BookClub
            | 
            |    server.js
            |
            |    package-lock.json
            |    package.json
            |    README.md
            |
            |--📂assets
            \--📂src
                    |
                    |   app.js
                    |
                    📂---controllers
                    |
                    |   livrariasController.js
                    |
                    |
                    📂---models
                    |
                    |   livrarias.json
                    |   
                    |
                    📂---routes
                        livrariasRoutes.js  			      

 ```

<div align = "justify">

- [server.js](https://github.com/BrunaCelestino/ON15-TET-S10-Revisao-API/blob/BrunaCelestino/para_o_lar/reprograma-BookClub/server.js) - Define onde o servidor local irá ser executado;

- [app.js](https://github.com/BrunaCelestino/ON15-TET-S10-Revisao-API/blob/BrunaCelestino/para_o_lar/reprograma-BookClub/src/app.js) - Requere as dependências necessárias para o projeto e define o padrão de cada rota;

- [controllers](https://github.com/BrunaCelestino/ON15-TET-S10-Revisao-API/tree/BrunaCelestino/para_o_lar/reprograma-BookClub/src/controllers) - pasta contendo o arquivo: [livrariasController.js](https://github.com/BrunaCelestino/ON15-TET-S10-Revisao-API/blob/BrunaCelestino/para_o_lar/reprograma-BookClub/src/controllers/livrariasController.js), que define, em fuções, o que cada rota deve realizar;
     
- [models](https://github.com/BrunaCelestino/ON15-TET-S10-Revisao-API/tree/BrunaCelestino/para_o_lar/reprograma-BookClub/src/models)- pasta contendo o aquivo [livrarias.json](https://github.com/BrunaCelestino/ON15-TET-S10-Revisao-API/blob/BrunaCelestino/para_o_lar/reprograma-BookClub/src/models/livrarias.json), que contém as informações sobre as livrarias; 

- [routes](https://github.com/BrunaCelestino/ON15-TET-S10-Revisao-API/tree/BrunaCelestino/para_o_lar/reprograma-BookClub/src/routes) - pasta contendo o arquivo: [livrariasRoutes.js](https://github.com/BrunaCelestino/ON15-TET-S10-Revisao-API/blob/BrunaCelestino/para_o_lar/reprograma-BookClub/src/routes/livrariasRoutes.js). Esse arquivo acrescenta o complemento à rota genérica, fazendo com que ela se torne completa e possa ser acessada; 

- Outros arquivos e pastas - pasta [assets](https://github.com/BrunaCelestino/ON15-TET-S10-Revisao-API/tree/BrunaCelestino/para_o_lar/reprograma-BookClub/assets), que contém o logo do projeto, package-lock.json e package.json. que são arquivos relacionados a dependências e README.md, contendo a documentação do projeto.

</div>

<br>

## DESENVOLVIMENTO 
<div align = "justify">

Através de um modelo pré-existente, foram indexadas mais 8 livrarias, encontradas na internet, para serem inseridas na API **{reprograma} Book Club**. Cada livraria foi preenchida com informações como nome, likes, deslikes, endereço, telefone os meios de pagamento aceitos e o site. Cada livraria é ordenada por um **id** numérico único.  
  

<div align = "center"> Exemplo de uma livraria cadastrada:  
</div>

```json

{
        "id": 3,
        "likes": 1,
        "deslikes": 1,
        "nome": "Livraria e Papelaria Skilo",
        "endereço": "Avenida Coronel Carlos Porto",
        "numero": 165,
        "bairro": "Jardim Pereira do Amparo",
        "cidade": "Jacareí",
        "telefone": "(12) 3962-4624",
        "pagamento": ["Dinheiro", "cartao"],
        "site" : "livrariaepapelariaskilo.com.br"
    },

```

<div align = "justify">

Após o término da fase de pesquisa e indexação das livrarias, foram desenvolvidas as lógicas necessárias para o funcionamento dos métodos, contidas dentro de funções. A cada função, um tratamento de erro foi criado por método **try-catch**, e os devidos status aplicados. Dentre os casos positivos, temos o status ***200*** indicando sucesso e ***201***, indicando que um item foi criado. Dentre os erros, podemos destacar o ***404***, onde um item não pode ser encontrado, ***406***, onde o request não é aceitado, ***409***, indicando conflito e ***500***, indicando erro interno do servidor.  
Com as lógicas contruídas, a próxima etapa foi a criação das seguintes rotas:

</div>

###  ROTAS: 

####  Método GET: 

<div align = "center">

|  Método  |                  Rota                       |                                Descrição                     |
| :------: | :-------------------------------------:     | :-------------------------------------------------------:    |
|  `GET`   | localhost:8099/livrarias/lista              |                            Lista de todas as livrarias       |
|  `GET`   | localhost:8099/livrarias/lista/:id          |                                      Busca por ID            |
|  `GET`   | localhost:8099/livrarias/nameSearch?name=   |                                       Busca por nome         |
|  `GET`   | localhost:8099/livrarias/phone              |                        Lista nome e telefone, busca por nome |
|  `GET`   | localhost:8099/livrarias/adress             |                         Lista nome e endereço, busca por nome|
|  `GET`   | localhost:8099/livrarias/payment            |Lista nome e opções de pagamento, busca por pagamento/nome    |
|  `GET`   | localhost:8099/livrarias/site               |            Lista nome e site, busca por nome                 |
|  `GET`   | localhost:8099/livrarias/likes              |                         Busca e lista organizada por likes   |

<br>
</div>

####  Método PATCH: 

<div align = "center">

|  Método  |                  Rota                       |                                Descrição                     |
| :------: | :-------------------------------------:     | :-------------------------------------------------------:    |
| `PATCH`  |  localhost:8099/livrarias/updateAdress/:id  |          Atualizar endereço da livraria por ID               |
| `PATCH`  | localhost:8099/livrarias/updateItem/:id     |          Atualizar qualquer item da livraria por ID          |
| `PATCH`  | localhost:8099/livrarias/likeDeslike/:id    |       Permite dar like ou deslike numa livraria, por ID      |

<br>
</div>

####  Método PUT: 

<div align = "center">

|  Método  |                  Rota                       |                                Descrição                     |
| :------: | :-------------------------------------:     | :-------------------------------------------------------:    |
|   `PUT`  |  localhost:8099/livrarias/updateAll/:id     |       Atualizar completamente livraria por ID                |

<br>
</div>


####  Método DELETE: 

<div align = "center">

|  Método  |                  Rota                       |                                Descrição                     |
| :------: | :-------------------------------------:     | :-------------------------------------------------------:    |
| `DELETE` |  localhost:8099/livrarias/delete/:id        |                      Deletar livraria por ID                 |

<br>
</div>



####  Método POST:

<div align = "center">

|  Método  |                  Rota                       |                                Descrição                     |
| :------: | :-------------------------------------:     | :-------------------------------------------------------:    |
|  `POST`  |     localhost:8099/livrarias/new            |                       Cadastrar nova livraria                |

<br>
</div>

###  FUNCIONAMENTO: 

<div align = "justify">

1. `GET`: localhost:8099/livrarias/lista    
Com essa rota, é possível se ter acesso a todas as livrarias cadastradas. Para refinar a busca, os seguintes Query Params foram criados: 
</div>

<div align = "center">

|Query Params|Função|
|:---  |:--- |
|`name`|filtrar livrarias por nome|
|`paymentOptions`|filtrar livrarias por opções de pagamento|
|`city`|filtrar livrarias por cidade|


</div>
<br>
<div align = "justify">
As Query Params podem ser combinadas para refinar ainda mais as buscas. 
</div>
<br>

2. `GET`: localhost:8099/livrarias/lista/:id    
Com essa rota, é possível se ter acesso a uma livraria, buscando-a pelo **id** inserido na própria rota. 
<br>

3. `GET`: localhost:8099/livrarias/nameSearch?name=     
Com essa rota, é possível se ter acesso a livrarias, buscando-as pelo nome. 
</div>

<div align = "center">

|Query Params|Função|
|:---  |:--- |
|`name`|buscar livrarias por nome|

</div>

<div align = "justify">

4. `GET`: localhost:8099/livrarias/phone  
Com essa rota, é possível se ter acesso a lista de livrarias com seus nomes e telefones. Usando os seguintes Query Params, é possível refinar a busca:

</div>

<div align = "center">

|Query Params|Função|
|:---  |:--- |
|`name`|filtrar livrarias por nome|

</div>

<div align = "justify">

```json
{
    "Busca por:": {},
    "Livrarias encontradas": 10,
    "Lista de livrarias": [
        {
            "Nome": "Livraria Cultura",
            "Telefone": "(11) 4156-4452"
        },

```

</div>

5. `GET`: localhost:8099/livrarias/adress      
Com essa rota, é possível se ter acesso a lista de livrarias com seus nomes e endereços. Usando os seguintes Query Params, é possível refinar a busca:

</div>

<div align = "center">

|Query Params|Função|
|:---  |:--- |
|`name`|filtrar livrarias por nome|


</div>

<div align = "justify">

```json
{
    "Busca por:": {},
    "Livrarias encontradas": 10,
    "Lista de livrarias": [
        {
            "Nome": "Livraria Cultura",
            "Endereço": "Rua Geraldo Abdala",
            "Número": 100,
            "Bairro": "centro",
            "Cidade": "Tangara"
        },

```

</div>

<div align = "justify">

6. `GET`: localhost:8099/livrarias/payment         
Com essa rota, é possível se ter acesso a lista de livrarias com seus nomes e opções de pagamento. Usando os seguintes Query Params, é possível refinar a busca:

</div>

<div align = "center">

|Query Params|Função|
|:---  |:--- |
|`name`|filtrar livrarias por nome|
|`paymentOptions`|filtrar livrarias por opções de pagamento|

</div>

7. `GET`: localhost:8099/livrarias/site            
Com essa rota, é possível se ter acesso a lista de livrarias com seus nomes e sites. Usando os seguintes Query Params, é possível refinar a busca:

</div>

<div align = "center">

|Query Params|Função|
|:---  |:--- |
|`name`|filtrar livrarias por nome|


</div>

<div align = "justify">

```json
{
    "Busca por:": {},
    "Livrarias encontradas": 10,
    "Lista de livrarias": [
        {
            "Nome": "Livraria Cultura",
            "Site da livraria": "livrariacultura.com.br"
        },
        {
            "Nome": "Rose Variedades",
            "Site da livraria": "rosevariedades.com.br"
        },
        
```

</div>

8. `GET`: localhost:8099/livrarias/likes    
Com essa rota, é possível se ter acesso a lista de livrarias organizada por likes, das mais altas até as mais baixas. Usando os seguintes Query Params, é possível refinar a busca:

</div>
<div align = "center">

|Query Params|Função|
|:---  |:--- |
|`name`|filtrar livrarias por nome|


</div>

```json
{
    "Busca por:": {},
    "Livrarias encontradas": 10,
    "Livrarias ordenadas por likes": [
        {
            "Nome": "Livraria Cultura",
            "Likes": 1,
            "Deslikes": 1
        },

```
<div align = "justify">

9. `PATCH`: localhost:8099/livrarias/updateAdress/:id              
Com essa rota, é possível atualizar o endereço das livrarias, buscando por **id** e enviando o um body request:

</div>


<div align = "justify">

```json
{
  "endereço": "Avenida José Pereira de Andrade",
  "numero": 495,
  "bairro": "Jardim Santa Maria",
  "cidade": "Jacareí"
}
           
```

</div>

<div align = "justify">

10. `PATCH`: localhost:8099/livrarias/updateItem/:id              
Com essa rota, é possível atualizar qualquer item de uma livraria, buscando por **id** e enviando o um body request com a chave desejada:

</div>


<div align = "justify">

```json
{
  "telefone": "(12) 98892-4146"
}            
```

</div>

<div align = "justify">

11. `PATCH`: localhost:8099/livrarias/likeDeslike/:id                
Com essa rota, é possível avaliar a livraria, buscando por **id** e enviando o um body request informando se você deseja dar um like ou um deslike. As quantidades de likes ou deslikes serão recalculadas:

</div>


<div align = "justify">

```json
{
  "likes": true,
  "deslikes": false
}    

```

</div>

12. `PUT`: localhost:8099/livrarias/updateAll/:id              
Com essa rota, é possível atualizar totalmente uma livraria, buscando por **id** e enviando o um body request com as novas informações. Não importa o id enviado no body, o id sempre será o mesmo do item que se deseja modificar:

</div>


<div align = "justify">

```json
    {
        "id": 0,
        "likes": 1,
        "deslikes": 1,
        "nome": "Livraria Bruna",
        "endereço": "Avenida José Pereira de Andrade",
        "numero": 495,
        "bairro": "Jardim Santa Maria",
        "cidade": "Jacareí",
        "telefone": "(12) 98892-4146",
        "pagamento": ["Dinheiro", "pix"],
        "site" : "livrariabruna.com.br"
    }

```

</div>

<div align = "justify">

13. `DELETE`: localhost:8099/livrarias/delete/:id                
Com essa rota, é possível deletar uma livraria, buscando por **id**.

</div>

<div align = "justify">

14. `POST`: localhost:8099/livrarias/new                
Com essa rota, é possível criar um nova livraria, através do body request, desde que todos os campos estejam preenchidos e que, caso o nome já exista na lista, que o telefone não seja igual ao da livraria com mesmo nome já existente.

</div>


<div align = "justify">

```json

    {
        "id": 0,
        "likes": 1,
        "deslikes": 1,
        "nome": "Livraria Bruna",
        "endereço": "Avenida José Pereira de Andrade",
        "numero": 495,
        "bairro": "Jardim Santa Maria",
        "cidade": "Jacareí",
        "telefone": "(12) 98892-4146",
        "pagamento": ["Dinheiro", "pix"],
        "site" : "livrariabruna.com.br"
    }

```

</div>

##  INFORMAÇÕES TÉCNICAS 
### DEPENDÊNCIAS:

<div align = "justify">

Para que fosse possível a execução desse projeto, foi necessária a utilização de algumas dependências, descritas a seguir:
</div>

<br>

###  Módulos:

<div align = "justify">

- [Express](https://www.npmjs.com/package/express) - framework para aplicativo da web do Node.js;
<br>

- [Nodemon](https://www.npmjs.com/package/nodemon) - ajuda no desenvolvimento de sistemas com o Node. js reiniciando automaticamente o servidor;
<br>

- [Cors](https://www.npmjs.com/package/cors) - permite que um site acesse recursos de outro site mesmo estando em domínios diferentes.
 <br>

</div>

###  Arquivos: 

<div align = "justify">

- [package-lock.json](https://github.com/BrunaCelestino/ON15-TET-S10-Revisao-API/blob/BrunaCelestino/para_o_lar/reprograma-BookClub/package-lock.json) - especifica a versão e suas dependências;
<br>

- [package.json](https://github.com/BrunaCelestino/ON15-TET-S10-Revisao-API/blob/BrunaCelestino/para_o_lar/reprograma-BookClub/package.json) - arquivo de configuração utilizado para estipular e configurar dependências;
<br>

- [.gitignore](https://github.com/BrunaCelestino/ON15-TET-S10-Revisao-API/blob/BrunaCelestino/.gitignore) - arquivo que lista quais arquivos ou pastas o Git deve ignorar.
<br>

</div>

<br>

###  INSTALAÇÃO: 

1. Entre na pasta onde você deseja clonar o repositório. Abra o **git** nela e digite: 

    ```bash
    $ git clone https://github.com/BrunaCelestino/ON15-TET-S10-Revisao-API
     ```

2. Digite a linha abaixo para entrar na pasta correta: 

    ```bash
    $ cd para_o_lar/
    ```

    ```bash
    $ cd reprograma-BookClub/
    ```
    
3. Escreva a seguinte linha para instalar as dependências utilizadas nesse projeto: 

   ```bash
    $ npm install
    ```
4. Inicie o servidor, utilizando a frase: 

   ```bash
    $ npm start
    ```   

<br>

<div align = "justify">

- Importe a coleção para teste deste servidor clicando [aqui](https://www.getpostman.com/collections/238bcac532d80f95c657)!

- Copie o link acima e, no Postman, clique em **Import** -> **Link** (cole o link) -> **Continue** -> **Import**.

</div>
