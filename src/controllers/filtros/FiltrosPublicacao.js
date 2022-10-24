import paginate from "../../library/paginate.js"
import publicacoes from "../../models/Publicacao.js"

async function FiltrosPublicacao(req) {
    const titulo = req.query.titulo
    const nomeUsuario = req.query.nomeUsuario
    const idUsuario = req.query.idUsuario
    const { page, perPage, limit } = req.query
    const { dataInicial, dataFinal } = req.query
    const tag = req.query.tag

    const options = {
        page: parseInt(page) || 1,
        limit: parseInt(perPage || limit) < 10 ? parseInt(perPage || limit) : 10 || 10,
    }

    let data = await publicacoes.find()

    if(titulo){
      const regexTitulo = new RegExp(titulo, 'i')
      data = data.filter((pub) => pub.titulo.match(regexTitulo));
    }

    if(tag){
      data = data.filter((pub) => pub.tags.find(t => t === tag))
    }

    if(nomeUsuario){
      const regexUsuario = new RegExp(nomeUsuario, 'i')
      data = data.filter((pub) => pub.usuario.nome.match(regexUsuario))
    }

    // Inutilizar até resolver a situação dos ids dos usuários não estarem entrando nas publicações no seed
    // if (idUsuario){
    //   data = data.filter((pub) => pub.usuario["_id"] === idUsuario)
    // }

    if (dataInicial && dataFinal){
      data = data.filter((pub) => {
        const date = pub.data.getTime()

        const min = new Date(dataInicial).getTime()
        const max = new Date(dataFinal).getTime()
        
        return(min <= date && date <= max)
      })
    }

    return paginate(data, options)
}

export default FiltrosPublicacao