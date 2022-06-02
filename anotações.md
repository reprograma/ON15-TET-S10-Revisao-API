```bash

touch server.js
npm init -y
npm i express cors
mkdir src
touch .gitignore
cd src # caminha até a pasta
pwd # visualiza o caminho atual
mkdir controllers routes models # cria as pastas
touch app.js  # cria a nossa aplicação
npm i -D nodemon || npm install nodemon --save-dev # para desistalar  npm uninstall nodemon


```
ordem de construção da api

app.js > server.js > models > controllers > routes > app.js > fim

json explicacao

[] -> coleção de dados = varios recursos => uma lista de livros
{} -> dados = um recurso => um livro