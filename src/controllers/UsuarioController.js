import usuarios from "../models/Usuario.js";
import FiltrosUsuarios from "./filtros/FiltrosUsuarios.js";
import bcrypt from 'bcrypt';
import validatingUser from "../../validation/userValidation.js";

class UsuarioController {

  // permissão implementada
  static listarUsuarios = async (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    try {
      const { query, options } = FiltrosUsuarios(req)

      const data = await usuarios.paginate(query, options)

      return res.json(data)

    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  }

  static listarUsuarioPorId = async (req, res) => {
    res.setHeader('Content-Type', 'application/json')

    try {
      const id = req.params.id;
      usuarios.findById(id)
        .exec((err, usuarios) => {
          if (err) {
            res.status(400).send({ message: `${err.message} - Usuário não localizado.` });
          } else {
            res.status(200).send(usuarios);
          }
        })

    } catch (err) {
      return res.status(400).json({ mensagem: err })
    }

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

      console.log(userToInsert.permissions[0])
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
            permissions: [
              {
                get: userToInsert.permissions[0].get || undefined,
                post: userToInsert.permissions[0].post || undefined,
                put: userToInsert.permissions[0].put || undefined,
                patch: userToInsert.permissions[0].patch || undefined,
                delete: userToInsert.permissions[0].delete || undefined
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
    res.setHeader('Content-Type', 'application/json')

    try {
      const id = req.params.id;
      const Method = req.method;

      validatingUser(req, res, Method, usuarios, async () => {
        usuarios.findByIdAndUpdate(id, { $set: req.body }, (err) => {
          if (!err) {
            res.status(200).send({ message: 'Usuário atualizado com sucesso' })
          } else {
            res.status(500).send({ message: err.message })
          }
        })
      })

    } catch (err) {
      return res.status(400).json({ mensagem: err })
    }

  }


  // permissão implementada
  static excluirUsuario = async (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    try {
      const id = req.params.id;
      const method = req.method

      validatingUser(req, res, method, usuarios, async () => {
        usuarios.findByIdAndDelete(id, (err) => {
          if (!err) {
            res.status(200).send({ message: 'Usuário removido com sucesso' })
          } else {
            res.status(500).send({ message: err.message })
          }
        })
      })
    } catch (err) {
      return res.status(400).json({ mensagem: err })
    }

  }

  static listarUsuarioPorNome = async (req, res) => {
    res.setHeader('Content-Type', 'application/json')

    try {

      const nome = req.query.nome
      const method = req.method

      validatingUser(req, res, method, usuarios, async () => {
        usuarios.find(
          { 'nome': { "$regex": nome, "$options": "i" } }, {}, (err, users) => {
            res.status(200).send(users);
          });
      })
    } catch (err) {
      return res.status(400).json({ mensagem: err })
    }

  }
}

export default UsuarioController;