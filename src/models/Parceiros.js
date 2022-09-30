import mongoose from "mongoose";

const parceirosSchema = new mongoose.Schema({
    nome: {type: String, required: true, trim: true},
    ativo: {type: Boolean, required: false, default: true},
    caminhoLongo: {type: String, required: false},
    descricao: {type: String, required: false}
})

const parceiros = mongoose.model("parceiros", parceirosSchema);

export default parceiros;
