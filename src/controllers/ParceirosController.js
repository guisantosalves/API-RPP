import parceiros from "../models/Parceiro.js";
import FiltrosParceiros from "./filtros/FiltrosParceiros.js";
import usuarios from '../models/Usuario.js'
import validatingUser from "../../validation/userValidation.js";

class ParceirosController {
  static listarParceiros = async (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    try {

      validatingUser(req, res, req.method, usuarios, async () => {
        const { query, options } = FiltrosParceiros(req)

        const data = await parceiros.paginate(query, options)

        return res.json(data)
      })

    } catch (err) {
      console.error(err);
      return res.status(400).send(err)
    }
  }

  static listarParceiroPorId = async (req, res) => {
    res.setHeader('Content-Type', 'application/json')

    try {
      const id = req.params.id;
      validatingUser(req, res, req.method, usuarios, async () => {
        const gettingParceiroByID = await parceiros.findById(id).exec();
        res.status(200).send(gettingParceiroByID)
      })

    } catch (err) {
      console.error(err);
      return res.status(400).send(err)
    }

  }

  static cadastrarParceiro = async (req, res) => {
    res.setHeader('Content-Type', 'application/json')

    try {
      validatingUser(req, res, req.method, usuarios, async () => {
        const myNewSave = new parceiros({
          nome: req.body.nome,
          ativo: req.body.ativo,
          caminhoLongo: req.body.caminhoLongo,
          descricao: req.body.descricao,
        })

        myNewSave.save((err, data) => {
          res.status(201).send(data)
        })
      })
    } catch (err) {
      console.error(err);
      return res.status(400).send(err)
    }

  }

  static atualizarParceiro = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    try {
      validatingUser(req, res, req.method, usuarios, async () => {
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
      })
    } catch (err) {
      console.error(err);
      return res.status(400).send(err)
    }
  }

  static excluirParceiro = (req, res) => {
    try {
      const id = req.params.id;
      validatingUser(req, res, req.method, usuarios, async () => {
        parceiros.findByIdAndDelete(id, (err, docs) => {
          res.status(200).send({ message: "Parceiro removido com sucesso" })
        })
      })
    } catch (err) {
      console.error(err);
      return res.status(400).send(err)
    }

  }

  static listarParceiroPorNome = (req, res) => {
    const nomefromQuery = req.query.nome;

    try {
      validatingUser(req, res, req.method, usuarios, async () => {
        parceiros.find({ nome: { 'nome': { "$regex": nome, "$options": "i" } } }).then(result => {
          res.status(200)
          res.send(result)
        });
      })
    } catch (err) {
      console.error(err);
      return res.status(400).send(err)
    }
  }

}

export default ParceirosController;