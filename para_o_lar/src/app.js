const express  =  require ( "express" ) 
const cors  =  require ( "cors" ) 
const shopsRoutes = require("./routes/shopsRoutes") 

const  app  =  express ( ) 

app . use ( cors ( ) ) 
app . use ( express.json ( ) ) 

app.use("/lojas", shopsRoutes)

module.exports = app 