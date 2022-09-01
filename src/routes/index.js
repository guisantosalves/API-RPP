import express from "express";
import publicacoes from "./publicacoesRoutes.js";
import usuarios from "./usuariosRoutes.js";
import parceiros from "./parceirosRoutes.js";

const routes = (app) => {
  app.route('/').get((rep, res) => {
    res.status(200).send({ título: "Gerenciador de usuários" })
  })

  app.use(
    express.json(),
    publicacoes,
    usuarios,
    parceiros
  )
}

export default routes