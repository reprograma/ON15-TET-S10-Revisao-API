const app = require("./src/app")

// const PORT = process.env.PORT //variavel de ambiente própria(que o ambiente fornece. Ex: heroku)
const PORT = 8000 //inserir a porta manualmente

app.listen(PORT, ()=>{
    console.log(`alô paixão, alô doçura. A porta é: ${PORT}`)
})
