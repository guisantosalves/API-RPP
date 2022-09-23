import express from "express";
import PublicacaoController from "../controllers/PublicacaoController.js";

const router = express.Router();

/** 
*  @swagger
*  paths:
*  /publicacoes:
*    get:
*      tags:
*        - Publicações
*      summary: Recupera todas as publicações
*      responses:
*        '200':
*          description: "Sucesso"
*          content:
*            application/json:
*              schema:
*                $ref: "#/components/schemas/publicacoes"
*        '404':
*          description: "Não foi possível acessar o banco de dados"
*          content:
*            application/json:
*              example: "Connection Error"
*    
*    post:
*      tags:
*        - Publicações
*      summary: Cadastra uma nova publicação
*      requestBody: 
*        content: 
*          application/json:
*            schema:
*              $ref: "#/components/schemas/publicacao_put"
*
*      responses:
*        '201':
*          description: "Sucesso"
*          content:
*            application/json:
*              schema:
*                $ref: "#/components/schemas/publicacao"
*
*        '404':
*          description: "Não foi possível inserir a publicação"
*          content:
*            application/json:
*              example: Not Found
*              
*        '409':
*          description: "Publicação existente"
*          content: 
*            application/json:
*              example: Conflict
*
*  /publicacoes/{id}:
*    parameters:
*      - name: id
*        in: path
*        schema: 
*          type: integer
*        required: true
*    get:
*      tags:
*        - Publicações
*      summary: Recupera uma publicação por ID
*      responses:
*        '200':
*          description: "Sucesso"
*          content:
*            application/json: 
*              schema:
*                $ref: '#/components/schemas/publicacao'
*        '404':
*          description: "Publicação não encontrada"
*          content:
*            application/json:
*              example: Not Found
*    
*    put:
*      tags:
*        - Publicações
*      summary: Atualiza uma publicação por ID
*
*      requestBody:
*        content:
*          application/json:
*            schema:
*              $ref: '#/components/schemas/publicacao_put'
*  
*      responses:
*        '200':
*          description: "Sucesso"
*          content:
*            application/json:
*              schema:
*                $ref: '#/components/schemas/publicacao'
*                
*        '204':
*          description: "Sem alteração"
*          content:
*            application/json:
*              schema:
*                $ref: '#/components/schemas/publicacao'
*                
*        '404':
*          description: "Publicação não encontrada"
*          content:
*            application/json:
*              example: Not Found
*              
*    delete:
*      tags:
*        - Publicações
*      summary: Apaga publicação por ID
*      responses:
*        '200':
*          description: "Sucesso"
*          content:
*            application/json: 
*              example: Deleted
*        '404':
*          description: "Publicação não encontrada"
*          content:
*            application/json:
*              example: Not Found
**/



router
  .get("/publicacoes", PublicacaoController.listarPublicacoes)
  .get("/publicacoes/:id", PublicacaoController.listarPublicacaoPorId)
  .post("/publicacoes", PublicacaoController.cadastrarPublicacao)
  .put("/publicacoes/:id", PublicacaoController.atualizarPublicacao)
  .delete("/publicacoes/:id", PublicacaoController.excluirPublicacao)

export default router;