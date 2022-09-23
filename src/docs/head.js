const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "API do Observatório de Políticas Públicas",
            description: "API para controlar a lógica de negócio do site",
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
                name: "Parceiros",
                description: "Parcerios da plataforma",
                externalDocs: {
                    description: "Leia mais",
                    url: "http://swagger.io"
                }
            }],
        paths: {},
        components: {
            schemas: {
                usuario: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer'
                        },
                        nome_usuario: {
                            type: 'string'
                        },
                        senha: {
                            type: 'string'
                        },
                        formacao: {
                            type: 'string'
                        },
                        nome: {
                            type: 'string'
                        },
                        inativo: {
                            type: 'boolean'
                        },
                        adm: {
                            type: 'boolean'
                        },
                        path_photo: {
                            type: 'string'
                        }
                    }
                },
                usuarios: {
                    type: 'array',

                    items: {
                        $ref: '#/components/schemas/usuario'
                    }
                },
                publicacao: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer'
                        },
                        data: {

                            type: 'string'
                        },
                        titulo: {

                            type: 'string'
                        },
                        registro: {

                            type: 'string'
                        },
                        tipo: {

                            type: 'string'
                        },
                        usuarioId: {

                            type: 'integer'
                        },
                    }
                },
                publicacoes:{
                    type: 'array',
                    items:{
                        $ref: '#/components/schemas/publicacao'
                    }
                },
                parceiros: {
                    type: 'object',
                    properties: {
                        id: {

                            type: 'integer'
                        },
                        nome: {

                            type: 'string'
                        },
                        ativo: {

                            type: 'boolean'
                        },
                        caminho_logo: {

                            type: 'string'
                        }
                    }
                }

            }
        }
    },
    apis: ["./src/routes/*.js"]
}

export default swaggerOptions