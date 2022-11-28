import usuarios from "../models/Usuario.js";
import FiltrosUsuarios from "./filtros/FiltrosUsuarios.js";
import bcrypt from 'bcrypt';
import validatingUser from "../../validation/userValidation.js";

class UsuarioController {

  // permissão implementada
  static listarUsuarios = async (req, res) => {
    try {
      validatingUser(req, res, "GET", usuarios, async () => {
        const { query, options } = FiltrosUsuarios(req)

        const data = await usuarios.paginate(query, options)

        return res.json(data)
      })

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
    res.setHeader('Content-Type', 'application/json')

    try {
      let userToInsert = req.body;
      const formacao = userToInsert.formacao.map((item, index) => (
        {
          titulo: item.titulo,
          curso: item.curso
        }
      ))

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(userToInsert.senha, salt, (err, hash) => {

          // para passar valores default no model, precisa, necessariamente colocar,
          // undefined na inserção, se n nao vem
          usuarios.create({
            nome: userToInsert.nome,
            email: userToInsert.email,
            senha: hash,
            formacao: formacao,
            ativo: userToInsert.ativo,
            adm: userToInsert.adm,
            path_photo: userToInsert.path_photo,
            permissions:[
              {
                get: undefined,
                post: undefined,
                put: undefined,
                patch: undefined,
                delete: undefined
              }
            ]
          })

        })
      })

      res.status(200).json({ message: "Cadastrado com sucesso" })
    } catch (err) {
      return res.status(400).json({ message: err })
    }
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


  // permissão implementada
  static excluirUsuario = async (req, res) => {
    const id = req.params.id;
    validatingUser(req, res, 'DELETE', usuarios, () => {
      usuarios.findByIdAndDelete(id, (err) => {
        if (!err) {
          res.status(200).send({ message: 'Usuário removido com sucesso' })
        } else {
          res.status(500).send({ message: err.message })
        }
      })
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