import usuarios from "../models/Usuario.js";

class UsuarioController {

  //dando certo
  static listarUsuarios = async (req, res) => {
    try {
      const nome = req.query.nome;
      const email = req.query.email;
      const adm = req.query.adm;
      const ativo = req.query.ativo || true
      const { page, perPage } = req.query;
      const options = { // limitar a quantidade máxima por requisição
        nome: (nome),
        page: parseInt(page) || 1,
        limit: parseInt(perPage) > 10 ? 10 : parseInt(perPage) || 10
      };
      if (!email && !nome && !adm && !ativo) {
        const usuario = await usuarios.paginate({}, options);
        return res.json(usuario);
      } else if (!email && !nome && !adm) {
        const usuario = await usuarios.paginate({ ativo: ativo }, options)
        return res.json(usuario)
      }
      else if (!email && !nome) {
        const usuario = await usuarios.paginate({ adm: adm }, options)
        return res.json(usuario)

      } else if (!nome) {
        const usuario = await usuarios.paginate({ login: { email: new RegExp(email, "i") } }, options)
        return res.json(usuario)
      } else {
        const usuario = await usuarios.paginate({ nome: new RegExp(nome, 'i') }, options);
        return res.json(usuario);
      }
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