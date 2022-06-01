<<<<<<< HEAD
const app = require('./src/app') // api em express

const PORT = 8000 // define uma porta para o nosso servidor escutar

// listen 1 parametro -> escutar > a gente deixa nossa api exposta no nosso servidor
// listen 2 parametro -> callback > no callback eu imprimo uma mensagem dizendo que meu api rodou
app.listen(PORT, () => console.log('Alo doçura, estou on na porta 8000'))
=======
const app = require('./src/app')

const PORT = 8000

app.listen(PORT, () => console.log('fé no pai, que agora vai, na porta 8000'))

>>>>>>> bc9a0fcdb58e080516f97f067b0207f7887c7881
