import mongoose from "mongoose"

mongoose.connect("mongodb+srv://admin:admin@cluster0.o9mrc.mongodb.net/OBSERVATORIO_POLITICAS_PUBLICAS");

let db = mongoose.connection;

export default db;