//npm run dev
import express from "express"
import {PrismaClient} from "@prisma/client"

const rotas = express.Router()
const prisma = new PrismaClient(); 

// CREATE
rotas.post("/post", async (request, response) => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();

    const date =  `${day}/${month}/${year}`
    const {postContent, postAuthor_id, postAuthor} = request.body;

    const post = await prisma.post.create({
        data: {
            user_id: postAuthor_id,
            content: postContent,
            date: date,
            author: postAuthor
        }
    });

    return response.status(201).json(post)

});

// READ
rotas.get("/post", async (request, response) => {
  const { user_id, post_id } = request.query;

  if (post_id) {
    const post = await prisma.post.findUnique({ where: { id: parseInt(post_id) } });
    if (!post) {
      return response.status(404).json({ error: "Post not found." });
    }
    return response.status(200).json(post);
  } else if (user_id) {
    const posts = await prisma.post.findMany({ where: { user_id: parseInt(user_id) } });
    return response.status(200).json(posts);
  } else {
    const posts = await prisma.post.findMany();
    return response.status(200).json(posts);
  }
});

// DELETE
rotas.delete("/post/:post_id", async (request, response) => {
  const { post_id } = request.params;

  try {
    const post = await prisma.post.findUnique({ where: { id: parseInt(post_id) } });
    if (!post) {
      return response.status(404).json({ error: "Post not found." });
    }

    await prisma.post.delete({ where: { id: parseInt(post_id) } });

    return response.status(200).json({ message: `Post with ID ${post_id} deleted successfully.` });
  } catch (error) {
    console.error('Error deleting post:', error);
    return response.status(500).json({ error: "Internal server error." });
  } finally {
    await prisma.$disconnect();
  }
});




export default rotas;