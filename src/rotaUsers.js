//npm run dev
import express from "express"
import {PrismaClient} from "@prisma/client"

const rotas = express.Router()
const prisma = new PrismaClient(); 

// CREATE
rotas.post("/user", async (request, response) => {
    const {user, senha, genero, email, cargo} = request.body;

    const userExiste = await prisma.user.findUnique({where: { username: user }});
    if (userExiste){ // caso user exista
        return response.status(404).json("User já existente");
    };

    if (!userExiste){
        const usuario = await prisma.user.create({
            data:{
                username: user,
                senha: senha,
                gender: genero,
                email: email,
                cargo: cargo
            },
        });
        return response.status(201).json(usuario)
    }
});

// READ
rotas.get("/user", async (request, response) => {
    const { login, userId } = request.query;
  
    if (login && userId) {
      return response.status(400).json("Provide either 'login' or 'userId', not both.");
    }
  
    let user;
    if (userId) {
      console.log("userId:", userId); // Log the value of userId to check if it's being parsed correctly
      user = await prisma.user.findUnique({ where: { id: parseInt(userId) } });
    } else if (login) {
      user = await prisma.user.findUnique({ where: { username: login } });
    } else {
      return response.status(400).json("Provide 'login' or 'userId' to search for a user.");
    }
  
    if (!user) {
      return response.status(404).json("User inexistente");
    }
  
    return response.status(200).json({
      id: user.id,
      username: user.username,
      senha: user.senha,
      cargo: user.cargo,
      email: user.email
    });
  });
  


// UPDATE
rotas.put("/user", async (request, response) => {
    const {user, userNovo, senha, genero, email, cargo} = request.body;

    if (!user) { // caso o usuario nao passe o nome de usuario
        return response.status(400).json("Insira um nome de usuário!");
    }

    const userExiste = await prisma.user.findUnique({where: { username: user }});

    if (!userExiste){ // caso user nao exista
        return response.status(404).json("User inexistente");
    };
        
    const usuario = await prisma.user.update({
        where:{
            username: user,
        },
        data:{
            username: userNovo,
            senha: senha,
            gender: genero,
            cargo: cargo,
            email: email,
        },
    });
    return response.status(200).json(usuario)
});


// DELETE
rotas.delete("/user/:username", async (request, response) => {
    const {username} = request.params;

    if (!username) { // caso o usuario nao passe o nome de usuario
        return response.status(400).json("Insira um nome de usuário");
    }

    const userExiste = await prisma.user.findUnique({where: { username: username }});

    if (!userExiste){ // caso user nao exista
        return response.status(404).json("Usuário inexistente");
    };

    await prisma.usuarios.delete({where: { username: username }});

    return response.status(200).send();
});
export default rotas;