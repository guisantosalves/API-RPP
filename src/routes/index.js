import express from "express";
// import parceiros from "./parceirosRoutes.js";
import usuarios from "./usuariosRoutes.js";
// import publicacoes from "./publicacoesRoutes.js";
import publicacaoes from "./publicacoesRoutes.js";

const routes = (app) => {
  app.route('/').get((rep, res) => {
    res.status(200).send({ título: "Gerenciador de usuários" })
  })

  
  // app.route('/').get((rep, res) => {
  //   res.status(200).send({ título: "Gerenciador de publicações"})
  // }
  // )
  
  app.use(
    express.json(),
    usuarios,
    publicacaoes
  )
}

export default routes