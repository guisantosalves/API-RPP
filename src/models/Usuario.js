import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema(
    {
        login: {
            type: {
                email: {
                    type: String,
                    required: true
                },
                senha: {
                    type: String,
                    required: true
                },
            }
        },
        nome: {
            type: String,
            required: true
        },
        formacao: {
            type: {
                titulo: {
                    type: String,
                    required: true
                },
                curso: {
                    type: String,
                    required: true
                },
                _id: {
                    required: false
                }
            },
            required: true
        },
        ativo: {
            type: Boolean,
            required: true
        },
        adm: {
            type: Boolean,
            required: true
        },
        path_photo: {
            type: String
        }
    }
);

const usuarios = mongoose.model('usuarios', usuarioSchema);

export default usuarios;