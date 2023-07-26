import express, { json } from "express";
import rota from "./rotaUsers.js";
import cors from "cors";
import rotaLogado from "./rotaLogado.js";
import rotaPosts from "./rotaPosts.js";
import rotaComments from "./rotaComments.js"

const app = express()

app.use(json());
app.use(cors())
app.use(rota);
app.use(rotaLogado);
app.use(rotaPosts);
app.use(rotaComments);

app.listen(3000, () => {
    console.log("Server running on port 3000")
})

console.log("Hello world!")


