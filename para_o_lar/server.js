const app = require('./src/app');
const PORT = 7050

app.listen(PORT, ()=>{
    console.log(`Servidor rodando na porta : ${PORT}`);
})