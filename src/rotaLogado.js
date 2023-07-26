import express from "express"
import {PrismaClient} from "@prisma/client"

const rotas = express.Router()
const prisma = new PrismaClient(); 

// CREATE
rotas.post("/logado", async (request, response) => {
    const {user, id_user} = request.body;
    const logado = await prisma.logado.create({
        data:{
            username: user,
            user_id: id_user
        }
    });

    return response.status(201).json(logado)
});

// READ
rotas.get("/logado", async (request, response) => {
    const usuario = await prisma.logado.findMany()
    return response.status(200).json(usuario)
});

// DELETE
rotas.delete("/logado", async (request, response) => {
    try {
        const usuario = await prisma.logado.findMany();
        
        if (usuario.length === 0) {
            return response.status(404).json({ error: "No records found in 'logado' table." });
        }
        const firstLogadoId = usuario[0].id;

        await prisma.logado.delete({
            where: {
                id: firstLogadoId,
            },
        });

        return response.status(200).json({ message: `Deleted the first record from 'logado' table.` });
    } catch (error) {
        console.error('Error deleting data:', error);
        return response.status(500).json({ error: "Internal server error." });
    } finally {
        await prisma.$disconnect();
    }
});

// UPDATE
rotas.put("/logado", async (request, response) => {
    const { user, id_user } = request.body;

    try {
        const usuario = await prisma.logado.findMany();
        if (usuario.length === 0) {
            return response.status(404).json({ error: "No records found in 'logado' table." });
        }
        const firstLogadoId = usuario[0].id;

        const updatedLogado = await prisma.logado.update({
            where: {
                id: firstLogadoId,
            },
            data: {
                username: user,
                user_id: id_user,
            },
        });

        return response.status(200).json(updatedLogado);
    } catch (error) {
        console.error('Error updating data:', error);
        return response.status(500).json({ error: "Internal server error." });
    } finally {
        await prisma.$disconnect();
    }
});

export default rotas;