import Parceiro from "../models/Parceiro.js";
import FiltrosParceiros from "./filtros/FiltrosParceiros.js";

class ParceirosController {
  static listarParceiros = async (req, res) => {
    try {
      const {query, options} = FiltrosParceiros(req)

      const data = await Parceiro.paginate(query, options)
      
      return res.json(data)
    } catch (err) {
      console.error(err);
      return res.status(400).send(err)
    }
  }

  static listarParceiroPorId = async (req, res) => {
    const id = req.params.id;
    try {
      const gettingParceiroByID = await Parceiro.findById(id).exec();
      res.status(200).send(gettingParceiroByID)
    } catch (err) {
      res.status(400).send(err)
    }

  }

  static cadastrarParceiro = async (req, res) => {
    try {
      const myNewSave = new Parceiro({
        nome: req.body.nome,
        ativo: req.body.ativo,
        caminhoLongo: req.body.caminhoLongo,
        descricao: req.body.descricao,
      })

      myNewSave.save((err, data) => {
        res.status(201).send(data)
      })
    } catch (err) {
      res.status(400).send(err)
    }

  }

  static atualizarParceiro = async (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    const id = req.params.id;
    Parceiro.findByIdAndUpdate({ _id: id }, {
      nome: req.body.nome,
      ativo: req.body.ativo,
      caminhoLongo: req.body.caminhoLongo,
      descricao: req.body.descricao,
    }, { new: true }).then((data, err) => {
      if (data) {
        return res.status(200).send(data);
      } else {
        res.status(400);
        return res.send(err);
      }
    })
  }

  static excluirParceiro = (req, res) => {
    try {
      const id = req.params.id;
      Parceiro.findByIdAndDelete(id, (err, docs) => {
        res.status(200).send({ message: "Parceiro removido com sucesso" })
      })
    } catch (err) {
      res.status(404).send({ message: err.message })
    }

  }

  static listarParceiroPorNome = (req, res) => {
    const nomefromQuery = req.query.nome;
    console.log(nomefromQuery)
    try {

      Parceiro.find({ nome: nomefromQuery }).then(result => {
        res.status(200)
        res.send(result)
      });


    } catch (err) {
      res.status(400).send(err)
    }
  }

}

export default ParceirosController;