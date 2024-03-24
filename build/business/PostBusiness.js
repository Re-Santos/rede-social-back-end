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
        // // create comment
        // this.createComment = (input) => __awaiter(this, void 0, void 0, function* () {
        //     const { post_id, comment, token } = input;
        //     if (post_id !== "string") {
        //         throw new BadRequestError_1.BadRequestError("'post_id' deve ser string");
        //     }
        //     if (comment === null) {
        //         throw new BadRequestError_1.BadRequestError("'COMMENT' inválido");
        //     }
        //     if (typeof comment !== "string") {
        //         throw new BadRequestError_1.BadRequestError("'COMMENT' deve ser uma string");
        //     }
        //     if (typeof post_id !== "string") {
        //         throw new BadRequestError_1.BadRequestError("'post_id' deve ser uma string");
        //     }
        //     const payload = this.tokenManager.getPayload(token);
        //     if (payload === null) {
        //         throw new BadRequestError_1.BadRequestError("'TOKEN' inválido");
        //     }
        //     const postById = yield this.postsDatabase.getPostById(post_id);
        //     if (!postById) {
        //         throw new BadRequestError_1.BadRequestError("'POST' não encontrado");
        //     }
        //     const id = this.idGenerator.generate();
        //     const content = "";
        //     const likes = 0;
        //     const dislikes = 0;
        //     const created_at = new Date().toISOString();
        //     const user_id = payload.id;
        //     const newComment = new PostModel_1.Posts(id, content, comment, likes, dislikes, created_at, {
        //         id: user_id,
        //         name: payload.username
        //     }, {
        //         id: "",
        //         post_id: "",
        //         comment: "",
        //         likes: 0,
        //         dislikes: 0,
        //         created_at: "",
        //         user: {
        //             user_id: "",
        //             name: "",
        //         }
        //     });
        //     const updatePost = new PostModel_1.Posts(postById.id, postById.content, postById.comment, postById.likes, postById.dislikes, postById.created_at, {
        //         id: user_id,
        //         name: payload.username
        //     }, {
        //         id: '',
        //         post_id: '',
        //         comment: '',
        //         likes: 0,
        //         dislikes: 0,
        //         created_at: '',
        //         user: {
        //             user_id: '',
        //             name: ''
        //         }
        //     });
        //     const newCommentDB = newComment.toModelsCommentDB();
        //     yield this.postsDatabase.createComment(newCommentDB);
        //     const newUpDatePostDB = updatePost.toPostModelsDB();
        //     yield this.postsDatabase.updatePost(newUpDatePostDB, postById.id);
        // });
        // //likeOrDislike
        // this.likeOrDislike = (input) => __awaiter(this, void 0, void 0, function* () {
        //     const { idToLikeOrDislike, token, like } = input;
        //     if (token === undefined) {
        //         throw new BadRequestError_1.BadRequestError("'TOKEN' inválido");
        //     }
        //     const payload = this.tokenManager.getPayload(token);
        //     if (payload === null) {
        //         throw new BadRequestError_1.BadRequestError("'TOKEN' inválido");
        //     }
        //     if (typeof like !== "boolean") {
        //         throw new BadRequestError_1.BadRequestError("'LIKE' deve ser um boolean");
        //     }
        //     const postToLike = yield this.postsDatabase.getPostById(idToLikeOrDislike);
        //     const commentToLike = yield this.postsDatabase.getCommentById(idToLikeOrDislike);
        //     if (!postToLike) {
        //         throw new BadRequestError_1.BadRequestError("'ID' não encontrado");
        //     }
        //     if (!commentToLike) {
        //         throw new BadRequestError_1.BadRequestError("'ID' não encontrado");
        //     }
        //     if (postToLike) {
        //         let like = postToLike.likes;
        //         let dislike = postToLike.dislikes;
        //         if (like === 0) {
        //             dislike++;
        //         }
        //         else if (like === 1) {
        //             like++;
        //         }
        //         else {
        //             throw new BadRequestError_1.BadRequestError("Você não pode realizar duas ações no mesmo post");
        //         }
        //     }
        //     const postLike = new PostModel_1.Posts(idToLikeOrDislike, postToLike.content, postToLike.comment, postToLike.likes, postToLike.dislikes, postToLike.created_at, { id: postToLike.user_id,
        //         name: payload.username }, { id: '',
        //         post_id: '',
        //         comment: '',
        //         likes: 0,
        //         dislikes: 0,
        //         created_at: '',
        //         user: {
        //             user_id: '',
        //             name: ''
        //         }
        //     });
        //     const userId = payload.id;
        //     const likesSended = like ? 1 : 0;
        //     const updateLikePost = {
        //         user_id: userId,
        //         post_id: idToLikeOrDislike,
        //         like: likesSended,
        //     };
        //     const postLikeDB = postLike.toPostModelsDB();
        //     yield this.postsDatabase.updatePost(postLikeDB, idToLikeOrDislike);
        //     yield this.postsDatabase.updateLikeOrDislikePost(updateLikePost);
        //     if (commentToLike) {
        //         let like = commentToLike.likes;
        //         let dislike = commentToLike.dislikes;
        //         if (like === 0) {
        //             dislike++;
        //         }
        //         else if (like === 1) {
        //             like++;
        //         }
        //         else {
        //             throw new BadRequestError_1.BadRequestError("Você não pode realizar duas ações no mesmo post");
        //         }
        //     }
        //     const commentLike = new PostModel_1.Posts(idToLikeOrDislike, commentToLike.content, commentToLike.comment, commentToLike.likes, commentToLike.dislikes, commentToLike.created_at, { id: commentToLike.user_id,
        //         name: payload.username }, { id: '',
        //         post_id: '',
        //         comment: '',
        //         likes: 0,
        //         dislikes: 0,
        //         created_at: '',
        //         user: {
        //             user_id: '',
        //             name: ''
        //         }
        //     });
        //     const updateLikeComment = {
        //         user_id: userId,
        //         comment_id: idToLikeOrDislike,
        //         like: likesSended,
        //     };
        //     const commentLikeDB = commentLike.toPostModelsDB();
        //     yield this.postsDatabase.updateComment(commentLikeDB, idToLikeOrDislike);
        //     yield this.postsDatabase.updateLikeOrDislikeComment(updateLikeComment);
        // });
    }
}
exports.PostsBusiness = PostsBusiness;
