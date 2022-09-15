import usuarios from "../models/Usuario.js";

class UsuarioController {

  static listarUsuarios = (req, res) => {
    usuarios.find()
      .populate()
      .exec((err, usuarios) => {
          res.status(200).json(usuarios)
    })
  }

  static listarUsuarioPorId = (req, res) => {
    const id = req.params.id;
    usuarios.findById(id)
    .populate()
      .exec((err, usuarios) => {
      if (err) {
        res.status(404).send({ message: `${err.message} - Usuário não encontrado.` })
      } else {
        res.status(200).send(usuarios);
      }
    })
  }

  static cadastrarUsuario = (req, res) => {
    let usuario = new usuarios(req.body);
    usuario.save((err) => {
      if (err) {
        res.status(404).send({ message: `${err.message} - Sem acesso ao banco.` })
      } if (err) {
        res.status(409).send({ message: `${err.message} - Usuário já existente.` })
        
      } else {
        res.status(201).send(usuario.toJSON())
      }
    })
  }

  static atualizarUsuario = (req, res) => {
    const id = req.params.id;
    usuarios.findByIdAndUpdate(id, { $set: req.body }, (err) => {
      if (!err) {
        res.status(200).send({ message: 'Sucesso' })
      } else {
        res.status(404).send({ message: err.message })
      }
    })
  }

  static excluirUsuario = (req, res) => {
    const id = req.params.id;
    usuarios.findByIdAndDelete(id, (err) => {
      if (!err) {
        res.status(200).send({ message: 'Sucesso' })
      } else {
        res.status(404).send({ message: err.message })
      }
    })
  }
}

export default UsuarioController;