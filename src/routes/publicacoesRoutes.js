import express from "express";
import PublicacaoController from "../controllers/PublicacaoController.js";

const router = express.Router();

router
  .get("/publicacoes", PublicacaoController.listarPublicacoes)
  .get("/publicacoes/:id", PublicacaoController.listarPublicacaoPorId)
  .post("/publicacoes", PublicacaoController.cadastrarPublicacao)
  .put("/publicacoes/:id", PublicacaoController.atualizarPublicacao)
  .delete("/publicacoes/:id", PublicacaoController.excluirPublicacao)

/* A comment. */
export default router;