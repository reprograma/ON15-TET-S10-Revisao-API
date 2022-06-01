const app = require("./src/app") //chamando o arquivo app

const PORT = 8182 // porta

//inicia o servidor
app.listen(PORT, ()=>{
    console.log(` RODANDO NA PORTA ${PORT}`)
})