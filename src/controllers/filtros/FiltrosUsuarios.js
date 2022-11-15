import paginate from "mongoose-paginate"
import usuarios from "../../models/Usuario.js"

async function FiltrosUsuarios(req) {
  const ativo = req.query.ativo;
  const nome = req.query.nome
  const email = req.query.email
  const tituloFormacao = req.query.tituloFormacao
  const cursoFormacao = req.query.cursoFormacao
  const adm = req.query.adm
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

  if (email){
    const regexEmail = new RegExp(email, 'i')

    query.email= regexEmail
  }

  /*if (tituloFormacao){
    const regexFormacao = new RegExp(tituloFormacao, 'i')

    query["formacao.titulo"] = regexFormacao
  }

  if (cursoFormacao){
    const regexFormacao = new RegExp(cursoFormacao, 'i')

    query["formacao.curso"] = regexFormacao
  }*/

  if (adm){
    if (adm == 'false')
      query.adm = false

    else if (adm == 'true')
      query.adm = true
  }
  
  const data = await usuarios.paginate(query, options)

  return data
}

export default FiltrosUsuarios;