"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const UserController_1 = __importDefault(require("../controller/UserController"));
const GetAllController_1 = __importDefault(require("../controller/GetAllController"));
const UserBusiness_1 = __importDefault(require("../business/UserBusiness"));
const GetAllBusiness_1 = __importDefault(require("../business/GetAllBusiness"));
const UserDatabase_1 = __importDefault(require("../database/UserDatabase"));
const getAllDatabase_1 = __importDefault(require("../database/getAllDatabase"));
const IdGenerator_1 = require("../services/IdGenerator");
const HashManager_1 = require("../services/HashManager");
const TokenManager_1 = require("../services/TokenManager");
const userDatabase = new UserDatabase_1.default();
const getAllDatabase = new getAllDatabase_1.default();
const idGenerator = new IdGenerator_1.IdGenerator();
const hashManager = new HashManager_1.HashManager();
const tokenManager = new TokenManager_1.TokenManager();
const userBusiness = new UserBusiness_1.default(userDatabase, idGenerator, hashManager, tokenManager);
const getAllBusiness = new GetAllBusiness_1.default(getAllDatabase);
const userController = new UserController_1.default(userBusiness);
const getAllController = new GetAllController_1.default(getAllBusiness);
const userRouter = express_1.default.Router();
exports.userRouter = userRouter;
userRouter.get('/', (req, res) => {
    res.send('Rota de Usuários');
});
userRouter.get('/ping', (req, res) => {
    res.send('pong!');
});
userRouter.get('/all', getAllController.getAllUsers);
userRouter.post('/signup', userController.signup);
userRouter.post('/login', userController.login);
