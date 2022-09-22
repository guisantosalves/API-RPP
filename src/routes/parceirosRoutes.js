import express from "express";
import ParceirosController from "../controllers/ParceirosController.js";

const router = express.Router();

// por algum motivo fazendo dessa maneira e nao quebrando o router e diferentes funções
// faz com que uma função de mesmo nome e de mesmo método sobreponha a mesma
// nao consigo chamar a função /parceiros no qual lista por nomes
// e a parceiros que lista todos, pois uma sobrepõe a outra
// por isso mudei o nome para parceirosbyName

// tudo funcionando :)
router
    .get("/parceirosbyName", ParceirosController.listarParceiroPorNome)
    .get("/parceiros", ParceirosController.listarParceiros)
    .get("/parceiros/:id", ParceirosController.listarParceiroPorId)
    .post("/parceiros", ParceirosController.cadastrarParceiro)
    .put("/parceiros/:id", ParceirosController.atualizarParceiro)
    .delete("/parceiros/:id", ParceirosController.excluirParceiro)

export default router;