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
exports.PostsController = void 0;
const BaseError_1 = require("../errors/BaseError");
class PostsController {
    constructor(PostsBusiness) {
        this.PostsBusiness = PostsBusiness;
        this.getPosts = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const input = {
                    token: req.headers.authorization
                };
                const output = yield this.PostsBusiness.getPosts(input);
                res.status(200).send(output);
            }
            catch (error) {
                console.log(error);
                if (error instanceof BaseError_1.BaseError) {
                    res.status(error.statusCode).send(error.message);
                }
                else {
                    res.status(500).send("Erro Inesperado");
                }
            }
        });
        this.createPost = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("Token recebido:", req.headers.authorization);
                const input = {
                    token: req.headers.authorization || '',
                    content: req.body.content,
                };
                console.log("Input da Controller", input);
                const output = yield this.PostsBusiness.createPost(input);
                res.status(201).send("Post criado com sucesso");
            }
            catch (error) {
                console.log(error);
                if (error instanceof BaseError_1.BaseError) {
                    res.status(error.statusCode).send(error.message);
                }
                else {
                    res.status(500).send("Erro Inesperado");
                }
            }
        });
        this.createComment = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const input = {
                    post_id: String(req.body.post_id),
                    comment: req.body.comment,
                    token: req.headers.authorization,
                };
                const output = yield this.PostsBusiness.createComment(input);
                res.status(201).send(output);
            }
            catch (error) {
                console.log(error);
                if (error instanceof BaseError_1.BaseError) {
                    res.status(error.statusCode).send(error.message);
                }
                else {
                    res.status(500).send("Erro Inesperado");
                }
            }
        });
        this.likeOrDislike = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const input = {
                    idToLikeOrDislike: req.params.id,
                    token: req.headers.authorization,
                    like: req.body.like
                };
                yield this.PostsBusiness.likeOrDislike(input);
                res.status(200).end();
            }
            catch (error) {
                console.log(error);
                if (error instanceof BaseError_1.BaseError) {
                    res.status(error.statusCode).send(error.message);
                }
                else {
                    res.status(500).send("Erro Inesperado");
                }
            }
        });
    }
}
exports.PostsController = PostsController;
