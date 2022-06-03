const app = require("./src/app");
const PORT = 9051

app.listen(PORT, ()=>{
    console.log(`Alô, douçura, estou ao vivo na porta: ${PORT}`);
})