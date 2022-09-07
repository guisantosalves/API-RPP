import swaggerUI from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import app from './src/app.js'
import * as dotenv from 'dotenv';


const port = process.env.port || 3031

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "API do repositório de políticas públicas",
      description: "Api para controlar a logica de negócio do site",
      version: "0.0.1",
      termsOfService: "http://localhost:3030",
      contact: {
        name: "developer",
        email: "observatorio@gmail.com",
      },
      license: {
        name: "MIT"
      },
    },
    servers: [
      {
        url: 'http://localhost:3030',
        description: "API em desenvovlvimento no FSLAB",
      },
      {
        url: 'http://localhost:3030',
        description: "API em produução no FSLAB",
      },
    ],
    tags: [
      {
        name: "Usuários",
        description: "Usuários do Observatório de Políticas Públicas",
        externalDocs: {
          description: "Leia mais",
          url: "http://swagger.io"
        }
      },
      {
        name: "Publicações",
        description: "Publicações da plataforma",
        externalDocs: {
          description: "Leia mais",
          url: "http://swagger.io"
        }
      }],
    paths: {}
  },
  apis: ["./src/routes/*.js"]
}

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs))

app.listen(port, () => {
  console.log(`Servidor escutando em http://localhost:${port}`)
  // console.log(process.env); // Visualizar as variáveis de ambiente em uso
})