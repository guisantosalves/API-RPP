import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate';


const usuarioSchema = new mongoose.Schema(
    {
        login: { type: { email: { type: String, required: true, minlength: 4, maxlength: 200, unique: true }, senha:{ type: String, required: true, minlength: 4, maxlength: 200 },} },
        nome: {type: String,required: true, minlength: 4, maxlength: 200 }, 
        formacao: [{ type: { titulo: { type: String, required: true, minlength: 4, maxlength: 200 },curso: { type: String, required: true, minlength: 4, maxlength: 200 }, _id: { required: false }},required: true }],
        ativo: { type: Boolean, required: true },
        adm: { type: Boolean, required: true },  
        path_photo: { type: String }
    },

    { versionKey: false }
);

usuarioSchema.plugin(mongoosePaginate);

const usuarios = mongoose.model('usuarios', usuarioSchema);

export default usuarios;