"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRouter = void 0;
const express_1 = __importDefault(require("express"));
const PostController_1 = require("../controller/PostController");
const PostBusiness_1 = require("../business/PostBusiness");
const PostDatabase_1 = require("../database/PostDatabase");
const IdGenerator_1 = require("../services/IdGenerator");
const TokenManager_1 = require("../services/TokenManager");
const validateToken_1 = require("../middlewares/validateToken");
exports.postRouter = express_1.default.Router();
const postsController = new PostController_1.PostsController(new PostBusiness_1.PostsBusiness(new PostDatabase_1.PostsDatabase(), new IdGenerator_1.IdGenerator(), new TokenManager_1.TokenManager()));
exports.postRouter.get("/", validateToken_1.validateToken, postsController.getPosts);
exports.postRouter.post("/", validateToken_1.validateToken, postsController.createPost);
// postRouter.post("/:id", validateToken, postsController.createComment);
// postRouter.post("/likeOrDislike", postsController.likeOrDislike);
// src/router/postRouter.ts
