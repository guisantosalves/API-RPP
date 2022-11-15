import usuarios from "../models/Usuario.js";
import FiltrosUsuarios from "./filtros/FiltrosUsuarios.js";

class UsuarioController {
  static listarUsuarios = async (req, res) => {
    try {
      const data = await FiltrosUsuarios(req)

      return res.json(data)
    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  }

  static listarUsuarioPorId = async (req, res) => {
    const id = req.params.id;
    await usuarios.findById(id)
      .exec((err, usuarios) => {
        if (err) {
          res.status(400).send({ message: `${err.message} - Usuário não localizado.` })
        } else {
          res.status(200).send(usuarios);
        }
      })
  }

  static cadastrarUsuario = async (req, res) => {
    let usuarios = new usuarios(req.body);
    usuarios.save((err) => {
      if (err) {
        res.status(500).send({ message: `${err.message} - Falha ao cadastrar usuário.` })
      } else {
        res.status(201).send(usuarios.toJSON())
      }
    })
  }

  static atualizarUsuario = async (req, res) => {
    const id = req.params.id;
    usuarios.findByIdAndUpdate(id, { $set: req.body }, (err) => {
      if (!err) {
        res.status(200).send({ message: 'Usuário atualizado com sucesso' })
      } else {
        res.status(500).send({ message: err.message })
      }
    })
  }


  static excluirUsuario = async (req, res) => {
    const id = req.params.id;
    usuarios.findByIdAndDelete(id, (err) => {
      if (!err) {
        res.status(200).send({ message: 'Usuário removido com sucesso' })
      } else {
        res.status(500).send({ message: err.message })
      }
    })
  }

  static listarUsuarioPorNome = async (req, res) => {
    const nome = req.query.nome
    usuarios.find({ 'nome': nome }, {}, (err, usuarios) => {
      res.status(200).send(usuarios);
    });
  }
}

export default UsuarioController;