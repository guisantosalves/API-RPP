import mongoose from "mongoose";

const {Schema} = mongoose

const usuarioSchema = new mongoose.Schema(
  {
    // _id: {type: Schema.Types.ObjectId},
    login: {
      usuario: {type: String},
      senha: {type: String} 
    },
    formacao: [{
      curso: {type: String}
    }],
    curriculo: {type: String},
    ativo: {type: Boolean},
    adm: {type: Boolean},
    path_photo: {type: String}
  }
)

const usuarios = mongoose.model('usuarios', usuarioSchema);

export default usuarios