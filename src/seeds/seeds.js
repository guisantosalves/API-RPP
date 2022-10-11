import faker from 'faker-br';
import db from '../config/dbConnect.js'
import Usuario from '../models/Usuario.js';
import Publicacao from '../models/Publicacao.js'
import Parceiro from '../models/Parceiro.js'

db.on("error", console.log.bind(console, "Conexão com o banco falhou!"));
db.once("open", () => {
    console.log("Conexão com o banco estabelecida!")
})

await Usuario.deleteMany()
await Publicacao.deleteMany()

const generateTags = () => {
    let tags = [];

    for (let i = 0; i <= 10; i++)
        tags.push(faker.lorem.word())

    return (tags)
}

const pick = (quantity, pickFrom = []) => {
    let result = []

    while (quantity > 0){
        const candidate = pickFrom[Math.floor(Math.random() * pickFrom.length)]

        if (!result.find(res => res === candidate)){
            result.push(candidate)
            quantity--;
        }
    }

    return result
}

for (let i = 1; i <= 10; i++) {
    const seedUsuarios = [
        {
            nome: faker.name.findName(),
            login: {
                email: faker.internet.email(),
                senha: faker.internet.password()
            },
            formacao: {
                titulo: "Graduação",
                curso: "Ciências Sociais"
            },
            ativo: Math.random() <= 0.5,
            adm: Math.random() <= 0.5,
            path_photo: 'arb.png'
        }
    ]

    const seedPublicacoes = [
        {
            titulo: faker.lorem.sentence(),
            data: faker.date.past(),
            tipo: Math.random <= 0.3 ? "Notícia" : Math.random() <= 0.6 ? "Projeto" : "Artigo",
            registro: faker.lorem.paragraphs(2),
            usuario: seedUsuarios[0],
            tags: pick(4, generateTags())
        }
    ]

    await Usuario.insertMany(seedUsuarios)
    await Publicacao.insertMany(seedPublicacoes)
}

await Parceiro.deleteMany()

for (let i = 1; i <= 3; i++){
    const seedParceiros = [{
        nome: faker.company.companyName(),
        ativo: faker.random.boolean(),
        caminho_logo: 'arb.png',
        descricao: faker.lorem.paragraphs()
    }]

    await Parceiro.insertMany(seedParceiros)
}

console.log("Dados inseridos!")

db.close((err) => err ? console.log(err) : console.log("Comunicação com o banco de dados encerrada!"))