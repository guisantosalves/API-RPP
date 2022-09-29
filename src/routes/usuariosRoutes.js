import express from "express";
import UsuarioController from "../controllers/UsuarioController.js";
//import usuarios from "../models/Usuario.js";

const router = express.Router();

/**
 * @swagger
 * #Rotas para usuário
 * /usuarios:
 *   get:
 *     tags:
 *       - Usuários
 *     summary: Recupera todos os usuários
 *     responses:
 *       '200':
 *         description: Sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/usuarios'
 *               
 *       '404':
 *         description: Nenhum usuário encontrado
 *         content:
 *           application/json:
 *             example: Not Found
 *   post:
 *     tags:
 *       - Usuários
 *     summary: Cadastra um novo usuário
 *     requestBody: 
 *       content: 
 *         application/json:
 *           schema:
 *              $ref: '#/components/schemas/usuario'  
 *               
 *     responses: 
 *       '201':
 *         description: Sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/usuarios'
 *       '404':
 *         description: Sem acesso ao banco
 *         content:
 *           application/json:
 *             example: Not Found
 *       '409':
 *         description: Usuário já existente
 *         content:
 *           application/json:
 *             example: Conflict
 *             
 * /usuarios/{id}:
 *   parameters:
 *     - name: id
 *       in: path
 *       schema: 
 *         type: integer
 *       required: true
 *   get:
 *     tags:
 *       - Usuários
 *     summary: Recupera um usuário por ID
 *     responses:
 *       '200':
 *         description: Sucesso
 *         content:
 *           application/json: 
 *             schema:
 *               $ref: '#/components/schemas/usuario'
 *       '404':
 *         description: Usuário não encontrado
 *         content:
 *           application/json:
 *             example: Not Found
 * 
 *   put:
 *     tags:
 *       - Usuários
 *     summary: Atualiza um usuário pelo ID
 *     requestBody:
 *       description: Atualiza um usuário pelo ID
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/usuario'
 *     responses:
 *       '200':
 *         description: Sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/usuario'
 *               
 *       '404':
 *         description: Nenhum usuário encontrado
 *         content:
 *           application/json:
 *             example: Not Found
 *   delete:
 *     tags:
 *       - Usuários
 *     summary: Apaga um usuário pelo ID
 *     responses:
 *       '200':
 *         description: Sucesso
 *         content:
 *           application/json:
 *             example: Deleted
 *               
 *       '404':
 *         description: Nenhum usuário encontrado
 *         content:
 *           application/json:
 *             example: Not Found
 * 
 */

router
  .get("/usuarios", UsuarioController.listarUsuarios)
  .get("/usuarios/:id", UsuarioController.listarUsuarioPorId)
  .get("/usuarios/busca", UsuarioController.listarUsuarioPorNome)
  .post("/usuarios", UsuarioController.cadastrarUsuario)
  .put("/usuarios/:id", UsuarioController.atualizarUsuario)
  .delete("/usuarios/:id", UsuarioController.excluirUsuario)

/* A comment. */
export default router;