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
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const BaseError_1 = require("../errors/BaseError");
const signup_dto_1 = require("../dtos/users/signup.dto");
const login_dto_1 = require("../dtos/users/login.dto");
class UserController {
    constructor(userBusiness) {
        this.userBusiness = userBusiness;
        //signup
        this.signup = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                //validando os dados de entrada
                const input = signup_dto_1.SignupSchema.parse({
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password
                });
                //chamando a lógica de signup no UserBusiness
                const output = yield this.userBusiness.signup(input);
                //respondendo com o token
                res.status(201).send(output);
            }
            catch (error) {
                console.log(error);
                if (error instanceof zod_1.ZodError) {
                    res.status(400).send(error.issues);
                }
                else if (error instanceof BaseError_1.BaseError) {
                    res.status(error.statusCode).send(error.message);
                }
                else {
                    res.status(500).send("Erro inesperado");
                }
            }
        });
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const input = login_dto_1.LoginSchema.parse({
                    email,
                    password,
                });
                // Chamando a lógica de login na UserBusiness
                const output = yield this.userBusiness.login(input);
                // Respondendo com o token
                res.status(200).send(output);
            }
            catch (error) {
                console.log(error);
                res.status(400).send({ message: "Invalid input data." });
            }
        });
    }
}
exports.default = UserController;
