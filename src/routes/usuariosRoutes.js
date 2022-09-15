import express from "express";
import UsuarioController from "../controllers/UsuarioController.js";
import usuarios from "../models/Usuario.js";

const router = express.Router();

router
  .get("/usuarios", UsuarioController.listarUsuarios)
  .get("/usuarios/:id", UsuarioController.listarUsuarioPorId)
  .post("/usuarios", UsuarioController.cadastrarUsuario)
  .put("/usuarios/:id", UsuarioController.atualizarUsuario)
  .delete("/usuarios/:id", UsuarioController.excluirUsuario)

/* A comment. */
export default router;