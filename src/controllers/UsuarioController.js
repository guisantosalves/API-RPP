import Usuario from "../models/Usuario.js";
import FiltrosUsuarios from "./filtros/FiltrosUsuarios.js";

class UsuarioController {
  static listarUsuarios = async (req, res) => {
    try {
      const {query, options} = FiltrosUsuarios(req)

      const data = await Usuario.paginate(query, options)

      return res.json(data)
    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  }

  static listarUsuarioPorId = async (req, res) => {
    const id = req.params.id;
    await Usuario.findById(id)
      .exec((err, usuarios) => {
        if (err) {
          res.status(400).send({ message: `${err.message} - Usuário não localizado.` })
        } else {
          res.status(200).send(usuarios);
        }
      })
  }

  static cadastrarUsuario = async (req, res) => {
    let usuario = new Usuario(req.body);
    usuario.save((err) => {
      if (err) {
        res.status(500).send({ message: `${err.message} - Falha ao cadastrar usuário.` })
      } else {
        res.status(201).send(usuario.toJSON())
      }
    })
  }

  static atualizarUsuario = async (req, res) => {
    const id = req.params.id;
    Usuario.findByIdAndUpdate(id, { $set: req.body }, (err) => {
      if (!err) {
        res.status(200).send({ message: 'Usuário atualizado com sucesso' })
      } else {
        res.status(500).send({ message: err.message })
      }
    })
  }


  static excluirUsuario = async (req, res) => {
    const id = req.params.id;
    Usuario.findByIdAndDelete(id, (err) => {
      if (!err) {
        res.status(200).send({ message: 'Usuário removido com sucesso' })
      } else {
        res.status(500).send({ message: err.message })
      }
    })
  }

  static listarUsuarioPorNome = async (req, res) => {
    const nome = req.query.nome
    Usuario.find({ 'nome': nome }, {}, (err, usuarios) => {
      res.status(200).send(usuarios);
    });
  }
}

export default UsuarioController;