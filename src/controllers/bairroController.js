const model = require("../models/bairroModels.json")

const enseada = (req, res) => {
  const { tipoCategoria, bairro} = req.body
  
  try {
    let estabelecimento = model.slice()
    
    if(estabelecimento.lenght === 0 ) {
      return res.status(200).json({
        message: "ainda não temos nenhum estabelecimento cadastrado" 
      })
    }

    if(tipoCategoria) {
      estabelecimento = estabelecimento.filter(buscar => buscar.tipoCategoria)
    } 

    if(bairro) {
      estabelecimento = estabelecimento.filter(buscar => buscar.bairro)
    }

    res.status(200).json(estabelecimento)
    
  }
  catch (error) {
    console.error(error)
  }
}

module.exports = {
  enseada 
}

