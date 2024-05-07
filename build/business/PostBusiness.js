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
exports.PostsBusiness = void 0;
const BadRequestError_1 = require("../errors/BadRequestError");
const UnauthorizedError_1 = require("../errors/UnauthorizedError");
const InternalServerError_1 = require("../errors/InternalServerError");
const PostModel_1 = require("../models/PostModel");
class PostsBusiness {
    constructor(postsDatabase, idGenerator, tokenManager) {
        this.postsDatabase = postsDatabase;
        this.idGenerator = idGenerator;
        this.tokenManager = tokenManager;
        this.getPosts = (input) => __awaiter(this, void 0, void 0, function* () {
            const { token } = input;
            if (!token) {
                throw new BadRequestError_1.BadRequestError("'TOKEN' ausente");
            }
            const payload = this.tokenManager.getPayload(token);
            if (!payload) {
                throw new UnauthorizedError_1.UnauthorizedError("'TOKEN' inválido");
            }
            const { postDB, userDB } = yield this.postsDatabase.getPostCreator();
            function creator(userId) {
                const user = userDB.find((userDB) => userDB.id === userId);
                if (!user) {
                    throw new Error("Usuário não encontrado");
                }
                return { id: user.id, name: user.name };
            }
            const posts = postDB.map((postDB) => {
                const creatorInfo = creator(postDB.user_id);
                const post = new PostModel_1.Posts(postDB.id, postDB.content, postDB.comment, postDB.likes, postDB.dislikes, postDB.created_at, creatorInfo, postDB.post_comment);
                return post.toBusinessPostModels();
            });
            return posts;
        });
        this.createPost = (input) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { token, content } = input;
                if (!token || typeof token !== 'string') {
                    throw new BadRequestError_1.BadRequestError("'TOKEN' deve ser string");
                }
                if (content === null || typeof content !== 'string') {
                    throw new BadRequestError_1.BadRequestError("'CONTENT' inválido");
                }
                const payload = this.tokenManager.getPayload(token);
                if (payload === null) {
                    throw new BadRequestError_1.BadRequestError("'TOKEN' inválido");
                }
                const id = this.idGenerator.generate();
                const created_at = new Date().toISOString();
                const user_id = payload.id;
                const newPost = new PostModel_1.Posts(id, content, "", 0, 0, created_at, {
                    id: user_id,
                    name: payload.username,
                }, {
                    id: '',
                    post_id: '',
                    comment: '',
                    likes: 0,
                    dislikes: 0,
                    created_at: '',
                    user: {
                        user_id: '',
                        name: '',
                    },
                });
                const postsDB = newPost.toPostModelsDB();
                yield this.postsDatabase.insertPost(postsDB);
            }
            catch (error) {
                if (error instanceof BadRequestError_1.BadRequestError) {
                    throw error;
                }
                else {
                    console.error(error);
                    throw new InternalServerError_1.InternalServerError("Erro interno inesperado");
                }
            }
        });
    }
}
exports.PostsBusiness = PostsBusiness;
