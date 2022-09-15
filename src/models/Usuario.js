import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema(
  {
      login: {
          type: String
      },
      senha: {
          type: String,
          required: true
      },
      nomeCompleto: {
          type: String,
          required: true
      },
      formacao: {
          type: String,
          required: true
      },

      email: {
        type: String,
        required: true
    },

      ativo: {
          type: Boolean,
          required: true
      },
      adm: {
          type: Boolean,
          required: true
      },
      path_foto: {
          type: String
      }
  }
);

const usuarios = mongoose.model('usuarios', usuarioSchema);

export default usuarios;