import faker from 'faker-br';
import db from '../config/dbConnect.js'
import Usuario from '../models/Usuario.js';

db.on("error", console.log.bind(console, "Conexão com o banco falhou!"));
db.once("open", () => {
    console.log("Conexão com o banco estabelecida!")
})

await Usuario.deleteMany()
for (let i = 1; i <= 10; i++){
    const seedUsuarios = [
        {
            nomeCompleto: faker.name,
            login: {
            }
        }
    ]
}