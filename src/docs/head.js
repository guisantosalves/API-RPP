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
            },
            {
                name:"Parceiros",
                description: "Parcerios da plataforma",
                externalDocs: {
                    description: "Leia mais",
                    url: "http://swagger.io"
                }
            }],
        paths: {}
    },
    apis: ["./src/routes/*.js"]
}

  export default swaggerOptions