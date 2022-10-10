import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate';


const usuarioSchema = new mongoose.Schema(
    {
        nome: { type: String, required: true},
        login: {
            email: { type: String, required: true },
            senha: { type: String, required: true },
        },
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
        adm: { type: Boolean, required: true },
        path_photo: { type: String, required: true},
    },
    
    { versionKey: false }
);

usuarioSchema.plugin(mongoosePaginate);

const usuarios = mongoose.model('usuarios', usuarioSchema);

export default usuarios;
