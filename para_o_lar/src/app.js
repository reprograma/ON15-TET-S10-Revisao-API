const express = require("express")

const cors = require("cors")

const StoreRotas = require("./routes/decoraçãoStoreRotas")

const app = express()

app.use(cors())

app.use(express.json())

app.use("/lojas", StoreRotas)



module.exports = app   
