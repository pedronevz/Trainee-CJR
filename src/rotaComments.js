//npm run dev
import express from "express"
import {PrismaClient} from "@prisma/client"

const rotas = express.Router()
const prisma = new PrismaClient(); 

rotas.post("/comments", async (request, response) => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();

    const date =  `${day}/${month}/${year}`
    const {commentContent, post_id, commentAuthor_id, commentAuthor} = request.body;

    const post = await prisma.comments.create({
        data: {
            post_id: post_id,
            user_id: commentAuthor_id,
            content: commentContent,
            date: date,
            author: commentAuthor
        }
    });

    return response.status(201).json(post)

});

rotas.get("/comments", async (request, response) => {
    const { user_id, post_id } = request.query;
  
    if (post_id) {
      const comments = await prisma.comments.findMany({ where: { post_id: parseInt(post_id) } });
      return response.status(200).json(comments);
    } else if (user_id) {
      const comments = await prisma.comments.findMany({ where: { user_id: parseInt(user_id) } });
      return response.status(200).json(comments);
    } else {
      const comments = await prisma.comments.findMany();
      return response.status(200).json(comments);
    }
  });
  

rotas.delete("/comments/:comment_id", async (request, response) => {
  const { comment_id } = request.params;

  try {
    const comment = await prisma.comments.findUnique({ where: { id: parseInt(comment_id) } });
    if (!comment) {
      return response.status(404).json({ error: "Post not found." });
    }

    await prisma.comments.delete({ where: { id: parseInt(comment_id) } });

    return response.status(200).json({ message: `Post with ID ${comment_id} deleted successfully.` });
  } catch (error) {
    console.error('Error deleting post:', error);
    return response.status(500).json({ error: "Internal server error." });
  } finally {
    await prisma.$disconnect();
  }
});




export default rotas;