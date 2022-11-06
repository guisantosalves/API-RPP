import usuarios from "../models/Usuario.js";
import FiltrosUsuarios from "./filtros/FiltrosUsuarios.js";

class UsuarioController {

  //dando certo
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


  /* static atualizarUsuario = async (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    const id = req.params.id;
      usuarios.findByIdAndUpdate({_id:id}, { 
        login: req.body.login,
        senha: req.body.senha,
        nomeCompleto: req.body.nomeCompleto,
        formacao: req.body.formacao,
        email: req.body.email,
        ativo: req.body.ativo,
        adm: req.body.adm,
        path_foto: req.body.path_foto,
      }, { new: true }).then((data, err) => {
        if(data){
          return res.status(200).send(data);
        }else{
          res.status(400);
          return res.send(err);
        }

      })

  } */

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


  /* static listarUsuarioPorNome = (req, res) => {
    const nomefromQuery = req.query.nome;
    console.log(nomefromQuery)
    try{

      usuarios.find({nomeCompleto: nomefromQuery}).then(result=>{
        res.status(200)
        res.send(result)
      });
      

    }catch(err){
      res.status(400).send(err)
    }
  } */

  static listarUsuarioPorNome = async (req, res) => {
    const nome = req.query.nome
    usuarios.find({ 'nome': nome }, {}, (err, usuarios) => {
      res.status(200).send(usuarios);
    });

  }

}

export default UsuarioController;