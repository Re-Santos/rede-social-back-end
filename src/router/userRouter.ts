
import express from 'express';

const userRouter = express.Router();

userRouter.get('/', (req, res) => {
  res.send('Rota de Usuários');
});

userRouter.get('/ping', (req, res) => {
  res.send('pong!');
});

export { userRouter };
