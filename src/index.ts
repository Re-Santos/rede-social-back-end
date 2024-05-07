import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { userRouter } from './router/userRouter'
import { postRouter } from './router/postRouter';

dotenv.config()

const app = express()

// Configuração detalhada do CORS para produção
app.use(cors({
    origin: 'https://projeto-labeddit-renata.surge.sh', // Domínio específico do frontend
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
    allowedHeaders: 'Content-Type, Authorization, Origin, X-Requested-With, Accept'
}));

app.use(express.json())

app.listen(Number(process.env.PORT) || 3003, () => {
    console.log(`Servidor rodando na porta ${Number(process.env.PORT) || 3003}`)
})

app.use("/users", userRouter)
app.use("/posts", postRouter);

app.get("/ping", (req, res) => {
  res.send("Pong!")
})
