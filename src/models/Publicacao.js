import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate';

const publicacaoSchema = new mongoose.Schema(
    {
        // _id: { type: String, required: true },
        titulo: { type: String, required: true, trim: true },
        data: { type: Date, required: true },
        tipo: { type: String, required: true },
        registro: { type: String, required: true },
        usuario: {
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
        
    },
    { versionKey: false }
);

publicacaoSchema.plugin(mongoosePaginate);

const publicacoes = mongoose.model('publicacoes', publicacaoSchema);

export default publicacoes;