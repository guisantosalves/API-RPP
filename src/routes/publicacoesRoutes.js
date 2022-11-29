import express from "express";
import PublicacaoController from "../controllers/PublicacaoController.js";
import authMiddleware from "../middlewares/AuthMidleware.js";

const router = express.Router();

/** 
 * @swagger
 * /publicacoes:
 *   get:
 *     parameters:
 *      - name: titulo
 *        description: Filtra por publicações cujo o título corresponda ao informado.
 *        in: path
 *        schema: 
 *          type: String
 *        required: false
 *      - name: dataInicial
 *        description: Determina uma data inicial para um intervalo de pesquisa. Deve ser usado em conjunto com o dataFinal.
 *        in: path
 *        schema:
 *          type: Date
 *        required: false
 *      - name: dataFinal
 *        description: Determina uma data final para um intervalo de pesquisa. Deve ser usado em conjunto com o dataInicial.
 *        in: path
 *        schema:
 *          type: Date
 *        required: false
 *      - name: tipo
 *        description: Filtra por publicações por um tipo específico. É possível filtrar por múltiplos tipos ao separar os atributos do parâmetro por ponto e vírgula(;)
 *        in: path
 *        schema: 
 *          type: String
 *        required: false
 *      - name: registro 
 *        description: Filtra por publicações que contenham o parâmetro informado no seu registro.
 *        in: path
 *        schema:  
 *          type: String
 *        required: false
 *      - name: tags
 *        description: Filtra por publicações que contenham as tags informadas. É possível usar múltiplas tags, desde que elas sejam sepradas por ponto e vírgula na requisição.
 *        in: path
 *        schema:
 *          type: String
 *        required: false
 *      - name: usuarioId
 *        description: Filtra por publicações cujo autor corresponde ao ID informado.
 *        in: path
 *        required: false
 * 
 *     tags:
 *       - Publicações
 *     summary: Recupera todas as publicações
 *     responses:
 *       '200':
 *         description: "Sucesso"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/publicacoes"
 *       '404':
 *         description: "Não foi possível acessar o banco de dados"
 *         content:
 *           application/json:
 *             example: "Connection Error"
 *   
 *   post:
 *     tags:
 *       - Publicações
 *     summary: Cadastra uma nova publicação
 *     requestBody: 
 *       content: 
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/publicacao_put"
 *
 *     responses:
 *       '201':
 *         description: "Sucesso"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/publicacao"
 *
 *       '404':
 *         description: "Não foi possível inserir a publicação"
 *         content:
 *           application/json:
 *             example: Not Found
 *             
 *       '409':
 *         description: "Publicação existente"
 *         content: 
 *           application/json:
 *             example: Conflict
 *
 * /publicacoes/{id}:
 *   parameters:
 *     - name: id
 *       in: path
 *       schema: 
 *         type: integer
 *       required: true
 *   get:
 *     tags:
 *       - Publicações
 *     summary: Recupera uma publicação por ID
 *     responses:
 *       '200':
 *         description: "Sucesso"
 *         content:
 *           application/json: 
 *             schema:
 *               $ref: '#/components/schemas/publicacao'
 *       '404':
 *         description: "Publicação não encontrada"
 *         content:
 *           application/json:
 *             example: Not Found
 *   
 *   put:
 *     tags:
 *       - Publicações
 *     summary: Atualiza uma publicação por ID(TOdos os campos)
 *
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/publicacao'
 * 
 *     responses:
 *       '200':
 *         description: "Sucesso"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/publicacao'
 *                
 *       '204':
 *         description: "Sem alteração"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/publicacao'
 *                
 *       '404':
 *         description: "Publicação não encontrada"
 *         content:
 *           application/json:
 *             example: Not Found
 *   patch:
 *     tags:
 *       - Publicações
 *     summary: Atualiza uma publicação por ID (Um ou vários campos)
 *
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/publicacao'
 * 
 *     responses:
 *       '200':
 *         description: "Sucesso"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/publicacao'
 *                
 *       '204':
 *         description: "Sem alteração"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/publicacao'
 *                
 *       '404':
 *         description: "Publicação não encontrada"
 *         content:
 *           application/json:
 *             example: Not Found
 * 
 *   delete:
 *     tags:
 *       - Publicações
 *     summary: Apaga publicação por ID
 *     responses:
 *       '200':
 *         description: "Sucesso"
 *         content:
 *           application/json: 
 *             example: Deleted
 *       '404':
 *         description: "Publicação não encontrada"
 *         content:
 *           application/json:
 *             example: Not Found
 *
 */



router
  .get("/publicacoes", PublicacaoController.listarPublicacoes)
  .get("/publicacoes/:id", PublicacaoController.listarPublicacaoPorId)
  .post("/publicacoes", authMiddleware, PublicacaoController.cadastrarPublicacao)
  .put("/publicacoes/:id", authMiddleware, PublicacaoController.atualizarPublicacao)
  .delete("/publicacoes/:id", authMiddleware, PublicacaoController.excluirPublicacao)
  .patch("/publicacoes/:id", authMiddleware, PublicacaoController.atualizarPublicacao)

export default router;