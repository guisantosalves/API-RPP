import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate';
mongoose.set('debug', true)

const usuarioSchema = new mongoose.Schema(
    {
        nome: { type: String, required: true },
        email: {
            type: String,
            required: true,
            match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
        },
        senha: { type: String, required: true },
        formacao: [
            {
                titulo: { type: String, required: true },
                curso: { type: String, required: true },
                _id: {
                    required: false
                }
            },
        ],
        ativo: { type: Boolean, required: true },
        adm: { type: Boolean, required: true }, //Remover adm posteriormente
        path_photo: { type: String, required: true },
        permissions: [
            {
                get: { type: Boolean, default: true },
                post: { type: Boolean, default: false },
                put: { type: Boolean, default: false },
                patch: { type: Boolean, default: false },
                delete: { type: Boolean, default: false }
            },
        ]
        /*
        rotas: {

        }
        */
    },

    { versionKey: false }
);

usuarioSchema.plugin(mongoosePaginate);

const usuarios = mongoose.model('usuarios', usuarioSchema);

export default usuarios;
