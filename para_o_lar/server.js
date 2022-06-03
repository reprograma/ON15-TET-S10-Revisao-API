const app = require('./src/app');
const PORT = 9000

app.listen(PORT, ()=>{
    console.log(`Oi, como vai? Estou na porta ${PORT}.`);
})