import mongoose from "mongoose";
import paginate from "../library/paginate.js";
import parceiros from "../models/Parceiro.js";

class ParceirosController {
  //dando certo
  static listarParceiros = async (req, res) => {
    try {
      const nome = req.query.nome
      const page = req.query.page
      const limit = req.query.perPage || req.query.limit
      const options = {
        nome: (nome),
        page: parseInt(page) || 1,
        limit: parseInt(limit) > 5 ? 5 : parseInt(limit) || 5
      }

      if (!nome) {
        const data = await parceiros.find()
        console.log(data)
        const parceiro = paginate(data, options);
        return res.json(parceiro)
      } else {
        const data = await parceiros.find()
        console.log(data)
        const parceiro = paginate(data, options);
        return res.json(parceiro)
      }
    } catch (err) {
      console.error(err);
      return res.status(400).send(err)

    }

  }

  // dando certo
  static listarParceiroPorId = async (req, res) => {
    const id = req.params.id;
    try {

      const gettingParceiroByID = await parceiros.findById(id).exec();
      res.status(200).send(gettingParceiroByID)
    } catch (err) {

      res.status(400).send(err)

    }

  }

  // dando certo
  static cadastrarParceiro = async (req, res) => {

    try {
      const myNewSave = new parceiros({
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

  // dando certo
  static atualizarParceiro = async (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    const id = req.params.id;
    parceiros.findByIdAndUpdate({ _id: id }, {
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

  // dando certo
  static excluirParceiro = (req, res) => {
    try {
      const id = req.params.id;
      parceiros.findByIdAndDelete(id, (err, docs) => {
        res.status(200).send({ message: "Parceiro removido com sucesso" })
      })
    } catch (err) {
      res.status(404).send({ message: err.message })
    }

  }

  //dando certo
  static listarParceiroPorNome = (req, res) => {
    const nomefromQuery = req.query.nome;
    console.log(nomefromQuery)
    try {

      parceiros.find({ nome: nomefromQuery }).then(result => {
        res.status(200)
        res.send(result)
      });


    } catch (err) {
      res.status(400).send(err)
    }
  }

}

export default ParceirosController;