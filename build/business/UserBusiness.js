"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BadRequestError_1 = require("../errors/BadRequestError");
const TokenManager_1 = require("../services/TokenManager");
const UserModel_1 = __importDefault(require("../models/UserModel"));
const NotFoundError_1 = require("../errors/NotFoundError");
class UserBusiness {
    constructor(userDatabase, idGenerator, hashManager, tokenManager) {
        this.userDatabase = userDatabase;
        this.idGenerator = idGenerator;
        this.hashManager = hashManager;
        this.tokenManager = tokenManager;
        //signup
        this.signup = (input) => __awaiter(this, void 0, void 0, function* () {
            const userDB = yield this.userDatabase.findUserByEmail(input.email);
            try {
                if (userDB) {
                    throw new BadRequestError_1.BadRequestError("E-mail já cadastrado.");
                }
                const newId = this.idGenerator.generate();
                const hashedPassword = yield this.hashManager.hash(input.password);
                // método signUp 
                const newUser = new UserModel_1.default(newId, input.username, input.email, hashedPassword, TokenManager_1.USER_ROLES.NORMAL, new Date());
                //salva o novo usuário no banco de dados
                yield this.userDatabase.createUser(newUser.toUserDB());
                // criando o payload do token
                const payload = {
                    id: newId,
                    username: input.username,
                    role: TokenManager_1.USER_ROLES.NORMAL,
                };
                const token = this.tokenManager.createToken(payload);
                const output = {
                    token
                };
                return output;
            }
            catch (error) {
                console.error("Erro durante o signup:", error);
                throw error;
            }
        });
        //login
        this.login = (input) => __awaiter(this, void 0, void 0, function* () {
            const { email, password } = input;
            const userDB = yield this.userDatabase.getUserByEmail(email);
            if (!userDB) {
                throw new NotFoundError_1.NotFoundError("Email not found.");
            }
            const hashedPassword = userDB.password;
            const isPasswordCorrect = yield this.hashManager.compare(password, hashedPassword);
            if (!isPasswordCorrect) {
                throw new BadRequestError_1.BadRequestError("Incorrect email or password.");
            }
            const user = new UserModel_1.default(userDB.id, userDB.username, userDB.email, userDB.password, userDB.role, userDB.created_at);
            const payload = {
                id: user.getId(),
                username: user.getName(),
                role: user.getRole()
            };
            const token = this.tokenManager.createToken(payload);
            const output = {
                message: "Logged in.",
                token
            };
            return output;
        });
    }
}
exports.default = UserBusiness;
