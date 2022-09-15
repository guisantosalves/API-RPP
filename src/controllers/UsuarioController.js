import usuarios from "../models/Usuario.js";

class UsuarioController {

  //dando certo
  static listarUsuarios = async (req, res) => {
    try{

      const gettingUser = await usuarios.find({}).exec();
      res.status(200).send(gettingUser);
    }catch(err){

      res.status(400).send(err);

    }
    
  }

  // dando certo
  static listarUsuarioPorId = async (req, res) => {
    const id = req.params.id;
    try{
      
      const gettingUserByID = await usuarios.findById(id).exec();
      res.status(200).send(gettingUserByID)
    }catch(err){

      res.status(400).send(err)

    }
    
  }

  // dando certo
  static cadastrarUsuario = async (req, res) => {
    let usuario = new usuarios(req.body);
    try{
      await usuario.save((err, data) => {

        res.status(201).send(data)
        
      })
    }catch(err){
      res.status(400).send(err)
    }

  }

  // dando certo
  static atualizarUsuario = async (req, res) => {
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

  }

  // dando certo
  static excluirUsuario = (req, res) => {
    const id = req.params.id;
    usuarios.findByIdAndDelete(id, (err, docs) => {
      if (!err) {
        res.status(200).send({message: "Usuário removido com sucesso"})
      } else {
        res.status(404).send({ message: err.message })
      }
    })
  }

  //dando certo
  static listarUsuarioPorNome = (req, res) => {
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
  }

}

export default UsuarioController;