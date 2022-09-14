import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema(
  {
    nome: { type: String, required: true },
    nome_usuario: { type: String, required: true },
    senha: { type: String, required: true },
    formacao: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true },
    path_foto: { type: String, trim: true },
    ativo: { type: Boolean, required: true },
    adm: { type: Boolean, required: true }
  }
);

const usuarios = mongoose.model('usuarios', usuarioSchema);

export default usuarios;