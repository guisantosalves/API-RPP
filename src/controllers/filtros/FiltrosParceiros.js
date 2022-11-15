import parceiros from "../../models/Parceiro.js"

async function FiltrosParceiros(req) {
  const nome = req.query.nome
  const page = req.query.page
  const limit = req.query.perPage || req.query.limit

  const options = {
    page: parseInt(page) || 1,
    limit: parseInt(limit) > 5 ? 5 : parseInt(limit) || 5
  }

  const query = {}

  if(nome){
    const regexNome = new RegExp(nome, 'i')
    query.nome = regexNome
  }

  return await parceiros.paginate(query, options)
}

export default FiltrosParceiros