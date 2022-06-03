const app = require('./src/app');
const PORT = 7061

app.listen(PORT, ()=>{
    console.log(`Sim!!!! Sou eu, a porta: ${PORT}`);
})