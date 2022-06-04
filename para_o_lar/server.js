const app = require('./src/app');
const PORT = 4020

app.listen(PORT, ()=>{
    console.log(`Relaxa, a porta ${PORT} tá aberta.`);
})