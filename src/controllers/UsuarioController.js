import usuarios from "../models/Usuario.js";

class UsuarioController{
  static listarUsuarios = (req, res) => {
    usuarios.find()
      .populate()
      .exec((err, usuarios) => {
        res.status(200).json(usuarios)
      })
  }
}

export default UsuarioController