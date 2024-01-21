
import express from 'express';
import UserController from '../controller/UserController';
import UserBusiness from '../business/UserBusiness';
import UserDatabase from '../database/UserDatabase';
import { IdGenerator } from '../services/IdGenerator';
import { HashManager } from '../services/HashManager';
import { TokenManager } from '../services/TokenManager';

const userDatabase = new UserDatabase();
const idGenerator = new IdGenerator();
const hashManager = new HashManager();
const tokenManager = new TokenManager();

const userBusiness = new UserBusiness(userDatabase, idGenerator, hashManager, tokenManager);
const userController = new UserController(userBusiness);

const userRouter = express.Router();

userRouter.get('/', (req, res) => {
  res.send('Rota de Usuários');
});

userRouter.get('/ping', (req, res) => {
  res.send('pong!');
});

userRouter.get('/all', userController.getAllUsers);

userRouter.post('/signup', userController.signup);


export { userRouter };
