"use strict";
// import { Request, Response } from "express";
// import { BaseError } from "../errors/BaseError";
// import { PostsBusiness } from "../business/PostBusiness";
// import { CreatePostInput, GetPostInput, LikeOrDislikeInput, createCommentInput } from "../dtos/posts/createPost.dto";
// export class PostsController {
//     constructor(
//         private PostsBusiness: PostsBusiness
//     ) { }
//     public getPosts = async (req: Request, res: Response) => {
//         try {
//             const input: GetPostInput = {
//                 token: req.headers.authorization
//             }
//             const output = await this.PostsBusiness.getPosts(input)
//             res.status(200).send(output)
//         } catch (error) {
//             console.log(error)
//             if (error instanceof BaseError) {
//                 res.status(error.statusCode).send(error.message)
//             } else {
//                 res.status(500).send("Erro Inesperado")
//             }
//         }
//     }
//     public createPost = async (req: Request, res: Response) => {
//         try {
//             console.log("Token recebido:", req.headers.authorization);
//             const input: CreatePostInput = {
//                 token: req.headers.authorization || '',
//                 content: req.body.content,
//             };
//             console.log("Input da Controller", input)
//             const output = await this.PostsBusiness.createPost(input)
//             res.status(201).send("Post criado com sucesso")
//         } catch (error) {
//             console.log(error)
//             if (error instanceof BaseError) {
//                 res.status(error.statusCode).send(error.message)
//             } else {
//                 res.status(500).send("Erro Inesperado")
//             }
//         }
//     }
//     public createComment = async (req: Request, res: Response) => {
//         try {
//             const input: createCommentInput = {
//                 id_post: req.body.id_post,
//                 comment: req.body.comment,
//                 token: req.body.authorization as string,
//             }
//             const output = await this.PostsBusiness.createComment(input)
//             res.status(201).send(output)
//         } catch (error) {
//             console.log(error)
//             if (error instanceof BaseError) {
//                 res.status(error.statusCode).send(error.message)
//             } else {
//                 res.status(500).send("Erro Inesperado")
//             }
//         }
//     }
//     public likeOrDislike = async (req: Request, res: Response) => {
//         try {
//             const input: LikeOrDislikeInput = {
//                 idToLikeOrDislike: req.params.id,
//                 token: req.headers.authorization,
//                 like: req.body.like
//             }
//             await this.PostsBusiness.likeOrDislike(input)
//             res.status(200).end()
//         } catch (error) {
//             console.log(error)
//             if (error instanceof BaseError) {
//                 res.status(error.statusCode).send(error.message)
//             } else {
//                 res.status(500).send("Erro Inesperado")
//             }
//         }
//     }
// }
