import swaggerUI from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import app from './src/app.js'
import * as dotenv from 'dotenv';


const port = process.env.port || 3031

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Gerenciador de acessos - API",
      version: "1.0.0"
    },
    apis: ["./src/routes/*.js"]
  }
}

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs))

app.listen(port, () => {
  console.log(`Servidor escutando em http://localhost:${port}`)
  // console.log(process.env); // Visualizar as variáveis de ambiente em uso
})