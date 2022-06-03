const app = require("./src/app") // API em express

const PORT = 8000 // Define uma porta para o nosso servidor escutar

/**
 * listen 1 parâmetro -> escutar > a gente deixa a nossa API exposta no nosso servidor
 * listen 2 parâmetro -> callback -> no callback eu imprimo uma 
 * mensagem dizendo que a minha api rodou
 */
app.listen(PORT, () => console.log("O One Piece está na porta 8000"))