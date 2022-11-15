import parceiros from "../../models/Parceiro"

async function FiltrosParceiros(req) {
  const nome = req.query.nome
  const page = req.query.page
  const limit = req.query.perPage || req.query.limit

  const options = {
    nome: (nome),
    page: parseInt(page) || 1,
    limit: parseInt(limit) > 5 ? 5 : parseInt(limit) || 5
  }

  const query = {}

  if(nome)
    query.nome = nome

  return await parceiros.paginate(query, options)
}

export default FiltrosParceiros