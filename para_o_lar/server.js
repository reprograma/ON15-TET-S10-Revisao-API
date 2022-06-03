const app = require('./src/app');
const PORT = 7365

app.listen(PORT, ()=>{
    console.log(`HOLD THE DOOR: ${PORT}`);
})