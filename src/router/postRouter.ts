import express from 'express';
import { PostsController } from '../controller/PostController';
import { PostsBusiness } from '../business/PostBusiness';
import { PostsDatabase } from '../database/PostDatabase';
import { IdGenerator } from '../services/IdGenerator';
import { TokenManager } from '../services/TokenManager';
import { validateToken } from '../middlewares/validateToken';


export const postRouter = express.Router();

const postsController = new PostsController(
  new PostsBusiness(
    new PostsDatabase(),
    new IdGenerator(),
    new TokenManager()
  )
);

postRouter.get("/", validateToken, postsController.getPosts);
postRouter.post("/", validateToken, postsController.createPost);
// postRouter.post("/:id", validateToken, postsController.createComment);
// postRouter.post("/likeOrDislike", postsController.likeOrDislike);



