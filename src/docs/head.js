const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "API do Observatório de Políticas Públicas",
            description: "API para controlar a lógica de negócio do site",
            version: "0.0.1",
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
                url: 'http://localhost:3010',
                description: "API de desenvovlvimento no FSLAB",
            },
            {
                url: 'https://api.opp.fslab.dev',
                description: "API de produção no FSLAB",
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
                            type: 'string'
                        },
                        formacao: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    titulo: {
                                        type: 'string'
                                    },
                                    curso: {
                                        type: 'string'
                                    }
                                }
                            }
                        },
                        email: {
                            type: 'string'
                        },
                        senha: {
                            type: 'string'
                        },
                        nome: {
                            type: 'string'
                        },
                        ativo: {
                            type: 'boolean'
                        },
                        path_photo: {
                            type: 'string'
                        },
                        rotas: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    rota: {
                                        type: 'string'
                                    },
                                    verbo_get: {
                                        type: 'boolean'
                                    },
                                    verbo_put: {
                                        type: 'boolean'
                                    },
                                    verbo_patch: {
                                        type: 'boolean'
                                    },
                                    verbo_delete: {
                                        type: 'boolean'
                                    },
                                    verbo_post: {
                                        type: 'boolean'
                                    }
                                }                                
                            }
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
                            type: 'string'
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
                        tags: {
                            type: 'array',

                            items: {
                                type: 'string'
                            }
                        },
                        tipo: {
                            type: 'string'
                        },
                        usuarioId: {
                            type: 'string'
                        },
                    }
                },
                publicacoes: {
                    type: 'array',
                    items: {
                        $ref: '#/components/schemas/publicacao'
                    }
                },
                parceiro: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'string'
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
                },
                parceiros: {
                    type: 'array',
                    items: {
                        $ref: '#/components/schemas/parceiro'
                    }
                }
            }
        }
    },
    apis: ["./src/routes/*.js"]
}

export default swaggerOptions