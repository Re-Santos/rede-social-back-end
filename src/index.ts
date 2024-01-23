
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors'; 
import { userRouter } from './router/userRouter';

dotenv.config();
const app = express();

app.use(cors()); 
app.use(express.json());
app.use('/users', userRouter);

const PORT = process.env.PORT || 3003;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});


