import faker from 'faker-br';
import db from '../config/dbConnect.js'
import bcrypt from 'bcrypt'
import Parceiro from '../models/Parceiro.js'
import usuarios from '../models/Usuario.js';
import publicacoes from '../models/Publicacao.js';

db.on("error", console.log.bind(console, "Conexão com o banco falhou!"));
db.once("open", () => {
    console.log("Conexão com o banco estabelecida!")
})




const getRandomInt = (max) => (
    Math.floor(Math.random() * max + 1)
)

const generateTags = () => {
    let tags = [];

    for (let i = 0; i <= 10; i++)
        tags.push(faker.lorem.word())

    return (tags)
}

const pick = (quantity, pickFrom = []) => {
    let result = []

    while (quantity > 0) {
        const candidate = pickFrom[Math.floor(Math.random() * pickFrom.length)]

        if (!result.find(res => res === candidate)) {
            result.push(candidate)
            quantity--;
        }
    }

    return result
}

const generateHash = () => {
    return bcrypt.hashSync("12345678", 8)
}




await usuarios.deleteMany()

const generateUsuarios = async (qtdUsuarios) => {
    for (let i = 0; i < qtdUsuarios; i++){
        const nome = faker.name.findName();
        const email = nome.toLowerCase().replaceAll(" ", "") + getRandomInt(99) + "@gmail.com";

        const usuario = [{
            nome: nome,
            email: email,
            senha: generateHash(),
            formacao: [{
                titulo: getRandomInt(2) > 1 ? "Graduação":  "Mestrado",
                curso: getRandomInt(2) > 1 ? "Ciências Sociais": "Ciências da computação"
            }],
            ativo: getRandomInt(2) > 1,
            adm: getRandomInt(2) > 1,
            path_photo: "unknown.png"
        }]

        await usuarios.insertMany(usuario)
    }
}

await generateUsuarios(20)


await publicacoes.deleteMany()

const getUsuarios = async () => {
    return await usuarios.find()
}

const generatePublicacoes = async (qtd) => {
    const users = await getUsuarios()
    const publicacoesArray = []

    for (let i = 0; i < qtd; i++){
        const userId = users[Math.floor(Math.random() * usuarios.length)]
        const randNum = Math.random()

        const publicacao = {
            titulo: faker.lorem.sentence(),
            data: faker.date.past(),
            tipo: randNum <= 0.3 ? "Notícia" : randNum <= 0.6 ? "Projeto" : "Artigo",
            registro: faker.lorem.paragraphs(2),
            usuarioId: userId,
            tags: pick(4, generateTags())
        }

        publicacoesArray.push(publicacao)
    }

    await publicacoes.insertMany(publicacoesArray)
}

await generatePublicacoes(40)

/*
const generateTags = () => {
    let tags = [];

    for (let i = 0; i <= 10; i++)
        tags.push(faker.lorem.word())

    return (tags)
}

const pick = (quantity, pickFrom = []) => {
    let result = []

    while (quantity > 0) {
        const candidate = pickFrom[Math.floor(Math.random() * pickFrom.length)]

        if (!result.find(res => res === candidate)) {
            result.push(candidate)
            quantity--;
        }
    }

    return result
}

//Gera e insere usuários

for (let i = 1; i <= 20; i++) {
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

    await Usuario.insertMany(seedUsuarios)
}

//Pega usuarios e insere em publicacoes

const usuarios = await Usuario.find()

for (let i = 0; i < 100; i++) {
    const randNum = Math.random()

    const seedPublicacoes = [
        {
            titulo: faker.lorem.sentence(),
            data: faker.date.past(),
            tipo: randNum <= 0.3 ? "Notícia" : randNum <= 0.6 ? "Projeto" : "Artigo",
            registro: faker.lorem.paragraphs(2),
            usuario: usuarios[Math.floor(Math.random() * usuarios.length)],
            tags: pick(4, generateTags())
        }
    ]

    await Publicacao.insertMany(seedPublicacoes)
}

await Parceiro.deleteMany()

for (let i = 1; i <= 3; i++) {
    const seedParceiros = [{
        nome: faker.company.companyName(),
        ativo: faker.random.boolean(),
        caminho_logo: 'arb.png',
        descricao: faker.lorem.paragraphs()
    }]

    await Parceiro.insertMany(seedParceiros)
}*/

console.log("Dados inseridos!")

db.close((err) => err ? console.log(err) : console.log("Comunicação com o banco de dados encerrada!"))