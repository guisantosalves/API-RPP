import paginate from "mongoose-paginate"
import usuarios from "../../models/Usuario.js"

async function FiltrosUsuarios(req) {
  const ativo = req.query.ativo;
  const nome = req.query.nome
  const { page, perPage, limit } = req.query

  const options = {
    page: parseInt(page) || 1,
    limit: parseInt(perPage || limit) < 10 ? parseInt(perPage || limit) : 10 || 10,
  }

  const query = {}

  if (ativo){
    if (ativo == 'false')
      query.ativo = false

    else if (ativo == 'true')
      query.ativo = true
  }

  else{
    query.ativo = true
  }

  if (nome){
    const regexNome = new RegExp(nome, 'i')

    query.nome = regexNome
  }
  
  const data = await usuarios.paginate(query, options)

  return data
}

export default FiltrosUsuarios;