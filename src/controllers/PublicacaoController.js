import Publicacao from "../models/Publicacao.js";
import FiltrosPublicacao from "./filtros/FiltrosPublicacao.js";

class PublicacaoController {
static listarPublicacoes = async (req, res) => {
    try {
      const {query, options} = FiltrosPublicacao(req)

      const data = await Publicacao.paginate(query, options)

      return res.json(data)
    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  }

  static listarPublicacaoPorId = async (req, res) => {
    const id = req.params.id;
    await Publicacao.findById(id)
      .exec((err, publicacoes) => {
        if (err) {
          res.status(400).send({ message: `${err.message} - Id da publicação não localizado.` })
        } else {
          res.status(200).send(publicacoes);
        }
      })
  }

  static cadastrarPublicacao = async (req, res) => {
    let publicacao = new Publicacao(req.body);
    await publicacao.save((err) => {
      if (err) {
        res.status(500).send({ message: `${err.message} - Falha ao cadastrar publicação.` })
      } else {
        res.status(201).send(publicacao.toJSON())
      }
    })
  }

  static atualizarPublicacao = async (req, res) => {
    const id = req.params.id;
    await Publicacao.findByIdAndUpdate(id, { $set: req.body }, (err) => {
      if (!err) {
        res.status(200).send({ message: 'Publicação atualizada com sucesso' })
      } else {
        res.status(500).send({ message: err.message })
      }
    })
  }

  static excluirPublicacao = async (req, res) => {
    const id = req.params.id;
    await Publicacao.findByIdAndDelete(id, (err) => {
      if (!err) {
        res.status(200).send({ message: 'Publicação removida com sucesso' })
      } else {
        res.status(500).send({ message: err.message })
      }
    })
  }

}

export default PublicacaoController;