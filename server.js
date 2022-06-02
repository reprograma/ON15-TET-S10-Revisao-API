const app = require('./src/app') // api em express

const PORT = 8000 // define uma porta para o nosso servidor escutar

/**
 * listen 1 parametro -> escutar >  a gente deixa a nossa api 
 * exposta no nosso servidor
 * listen 2 parametro -> callback -> no callback eu imprimo uma 
 * mensagem dizendo que a minha api rodou
 */
app.listen(PORT, () => console.log('fé no pai, que agora vai, na porta 8000'))

