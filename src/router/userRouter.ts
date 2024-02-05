import express from 'express';
import UserController from '../controller/UserController';
import GetAllController from '../controller/GetAllController';
import UserBusiness from '../business/UserBusiness';
import GetAllBusiness from '../business/GetAllBusiness';
import UserDatabase from '../database/UserDatabase';
import GetAllDatabase from '../database/getAllDatabase';
import { IdGenerator } from '../services/IdGenerator';
import { HashManager } from '../services/HashManager';
import { TokenManager } from '../services/TokenManager';

const userDatabase = new UserDatabase();
const getAllDatabase = new GetAllDatabase();
const idGenerator = new IdGenerator();
const hashManager = new HashManager();
const tokenManager = new TokenManager();

const userBusiness = new UserBusiness(userDatabase, idGenerator, hashManager, tokenManager);
const getAllBusiness = new GetAllBusiness(getAllDatabase);

const userController = new UserController(userBusiness);
const getAllController = new GetAllController(getAllBusiness);

const userRouter = express.Router();

userRouter.get('/', (req, res) => {
  res.send('Rota de Usuários');
});

userRouter.get('/ping', (req, res) => {
  res.send('pong!');
});

userRouter.get('/all', getAllController.getAllUsers);

userRouter.post('/signup', userController.signup);

userRouter.post('/login', userController.login);

export { userRouter };

