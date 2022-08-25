import mongoose from "mongoose"

mongoose.connect("mongodb+srv://admin:admin@cluster0.o9mrc.mongodb.net/test");

let db = mongoose.connection;

export default db;