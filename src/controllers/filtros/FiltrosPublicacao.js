import paginate from "../../library/paginate.js"
import publicacoes from "../../models/Publicacao.js"

async function FiltrosPublicacao(req) {
    const titulo = req.query.titulo
    const { page, perPage, limit } = req.query
    const tag = req.query.tag

    const options = {
        page: parseInt(page) || 1,
        limit: parseInt(perPage || limit) < 10 ? parseInt(perPage || limit) : 10 || 10,
    }

    let data = await publicacoes.find()

    if(titulo){
      const rx = new RegExp(titulo, 'i')
      data = data.filter((pub) => pub.titulo.match(rx));
    }

    if(tag){
      data = data.filter((pub) => pub.tags.find(t => t === tag))
    }

    return paginate(data, options)
}

export default FiltrosPublicacao