import paginate from "mongoose-paginate"
import usuarios from "../../models/Usuario.js"

async function FiltrosUsuarios(req) {
  const ativo = req.ativo || true;
  const { page, perPage, limit } = req.query

  const options = {
    page: parseInt(page) || 1,
    limit: parseInt(perPage || limit) < 10 ? parseInt(perPage || limit) : 10 || 10,
  }

  const query = {}

  query.ativo = ativo;
  
  const data = await usuarios.paginate(query, options)

  return data
}

export default FiltrosUsuarios;