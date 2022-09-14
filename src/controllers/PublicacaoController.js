import publicacoes from "../models/Publicacao.js";

class PublicacaoController {
static listarPublicacoes = async (req, res) => {
    try {
      const titulo = req.query.titulo;
      const { page, perPage } = req.query;
      const options = { // limitar a quantidade máxima por requisição
        titulo: (titulo),
        page: parseInt(page) || 1,
        limit: parseInt(perPage) || 10,
      };

      if (!titulo) {
        const publicacao = await publicacoes.paginate({}, options);
        return res.json(publicacao);
      } else {
        const publicacao = await publicacoes.paginate({ titulo: titulo }, options);
        return res.json(publicacao);
      }
      
    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  }

  static listarPublicacaoPorId = async (req, res) => {
    const id = req.params.id;
    await publicacoes.findById(id)
    //   .populate('publicacao', ['_id', 'titulo', 'data', 'tipo', 'registro', 'usuario'])
      .exec((err, publicacoes) => {
        if (err) {
          res.status(400).send({ message: `${err.message} - Id da publicação não localizado.` })
        } else {
          res.status(200).send(publicacoes);
        }
      })
  }

  static cadastrarPublicacao = async (req, res) => {
    let publicacao = new publicacoes(req.body);
    await publicacao.save((err) => {
      if (err) {
        res.status(500).send({ message: `${err.message} - falha ao cadastrar publicação.` })
      } else {
        res.status(201).send(publicacao.toJSON())
      }
    })
  }

  static atualizarPublicacao = async (req, res) => {
    const id = req.params.id;
    await publicacoes.findByIdAndUpdate(id, { $set: req.body }, (err) => {
      if (!err) {
        res.status(200).send({ message: 'Publicação atualizada com sucesso' })
      } else {
        res.status(500).send({ message: err.message })
      }
    })
  }

  static excluirPublicacao = async (req, res) => {
    const id = req.params.id;
    await publicacoes.findByIdAndDelete(id, (err) => {
      if (!err) {
        res.status(200).send({ message: 'Publicação removida com sucesso' })
      } else {
        res.status(500).send({ message: err.message })
      }
    })
  }

}

export default PublicacaoController;