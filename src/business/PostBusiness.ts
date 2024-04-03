import { PostsDatabase } from "../database/PostDatabase";
import { CreatePostInput, GetPostInput, LikeOrDislikeInput, createCommentInput } from "../dtos/posts/createPost.dto";
import { BadRequestError } from "../errors/BadRequestError";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { InternalServerError } from "../errors/InternalServerError";
import { NotFoundError } from "../errors/NotFoundError";
import { Posts } from "../models/PostModel";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";


export class PostsBusiness {
    constructor(
        private postsDatabase: PostsDatabase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager,
    ) { }

    public getPosts = async (input: GetPostInput) => {
        const { token } = input;
    
        if (!token) {
            throw new BadRequestError("'TOKEN' ausente");
        }
    
        const payload = this.tokenManager.getPayload(token);
    
        if (!payload) {
            throw new UnauthorizedError("'TOKEN' inválido");
        }
    
        const { postDB, userDB } = await this.postsDatabase.getPostCreator();
    
        function creator(userId: string): { id: string; name: string } {
            const user = userDB.find((userDB) => userDB.id === userId);
        
            if (!user) {
                throw new Error("Usuário não encontrado");  
            }
        
            return { id: user.id, name: user.name };
        }            
    
        const posts = postDB.map((postDB) => {
            const creatorInfo = creator(postDB.user_id);
            const post = new Posts(
                postDB.id,
                postDB.content,
                postDB.comment,
                postDB.likes,
                postDB.dislikes,
                postDB.created_at,
                creatorInfo,
                postDB.post_comment
            );
        
            return post.toBusinessPostModels();
        });
        
    
        return posts;
    }
    
    public createPost = async (input: CreatePostInput): Promise<void> => {
        try {
            const { token, content } = input;
    
            if (!token || typeof token !== 'string') {
                throw new BadRequestError("'TOKEN' deve ser uma string válida");
            }
        
            if (content === null || typeof content !== 'string') {
                throw new BadRequestError("'CONTENT' inválido");
            }
        
            const payload = this.tokenManager.getPayload(token);
        
            if (!payload) {
                throw new UnauthorizedError("'TOKEN' inválido");
            }
        
            const id = this.idGenerator.generate();
            const created_at = new Date().toISOString();
            const user_id = payload.id;
        
            const newPost = new Posts(
                id,
                content,
                '', // comment
                0, // likes
                0, // dislikes
                created_at,
                { id: user_id, name: '' }, // user
                { id: '', post_id: '', comment: '', likes: 0, dislikes: 0, created_at: '', user: { user_id: '', name: '' } } // post_comment
            );
        
            await this.postsDatabase.insertPost(newPost.toPostDB());
        } catch (error) {
            if (error instanceof BadRequestError || error instanceof UnauthorizedError) {
                throw error;
            } else {
                console.error(error);
                throw new InternalServerError("Erro interno inesperado");
            }
        }
    };
    
    
    
    // create comment

    // public createComment = async (input: createCommentInput): Promise<void> => {
    //     const { post_id, comment, token } = input

    //     if (post_id !== "string") {
    //         throw new BadRequestError("'post_id' deve ser string")
    //     }
    //     if (comment === null) {
    //         throw new BadRequestError("'COMMENT' inválido")
    //     }
    //     if (typeof comment !== "string") {
    //         throw new BadRequestError("'COMMENT' deve ser uma string")
    //     }
    //     if (typeof post_id !== "string") {
    //         throw new BadRequestError("'post_id' deve ser uma string")
    //     }
    //     const payload = this.tokenManager.getPayload(token)
    //     if (payload === null) {
    //         throw new BadRequestError("'TOKEN' inválido")
    //     }
    //     const postById = await this.postsDatabase.getPostById(post_id)
    //     if (!postById) {
    //         throw new BadRequestError("'POST' não encontrado")
    //     }

    //     const id = this.idGenerator.generate()
    //     const content = ""
    //     const likes = 0
    //     const dislikes = 0
    //     const created_at = new Date().toISOString()
    //     const user_id = payload.id

    //     const newComment = new Posts(
    //         id,
    //         content,
    //         comment,
    //         likes,
    //         dislikes,
    //         created_at,
    //         {
    //             id: user_id,
    //             name: payload.username
    //         },
    //         {
    //             id: "",
    //             post_id: "",
    //             comment: "",
    //             likes: 0,
    //             dislikes: 0,
    //             created_at: "",
    //             user: {
    //                 user_id: "",
    //                 name: "",
    //             }
    //         }

    //     )
    //     const updatePost = new Posts(
    //         postById.id,
    //         postById.content,
    //         postById.comment,
    //         postById.likes,
    //         postById.dislikes,
    //         postById.created_at,
    //         {
    //             id: user_id,
    //             name: payload.username
    //         },
    //         {
    //             id: '',
    //             post_id: '',
    //             comment: '',
    //             likes: 0,
    //             dislikes: 0,
    //             created_at: '',
    //             user: {
    //                 user_id: '',
    //                 name: ''
    //             }
    //         }
    //     )
    //     const newCommentDB = newComment.toModelsCommentDB()
    //     await this.postsDatabase.createComment(newCommentDB)

    //     const newUpDatePostDB = updatePost.toPostModelsDB()
    //     await this.postsDatabase.updatePost(newUpDatePostDB, postById.id)
    // }

    // //likeOrDislike

    // public likeOrDislike = async(input: LikeOrDislikeInput): Promise<void> => {
    //     const { idToLikeOrDislike, token, like} = input
    //     if (token === undefined) {
    //         throw new BadRequestError("'TOKEN' inválido")
    //     }
   
    //     const payload = this.tokenManager.getPayload(token)
   
    //     if (payload === null) {
    //         throw new BadRequestError("'TOKEN' inválido")
    //     }
   
    //     if (typeof like !== "boolean") {
    //         throw new BadRequestError("'LIKE' deve ser um boolean")
    //     }
    
    //     const postToLike = await this.postsDatabase.getPostById(idToLikeOrDislike)
    //     const commentToLike = await this.postsDatabase.getCommentById(idToLikeOrDislike)

    //     if(!postToLike){
    //         throw new BadRequestError("'ID' não encontrado")
    //     }

    //     if(!commentToLike){
    //         throw new BadRequestError("'ID' não encontrado")
    //     }
    //     if(postToLike){
    //         let like = postToLike.likes
    //         let dislike = postToLike.dislikes

    //         if(like === 0){
    //             dislike++
    //         }else if(like === 1){
    //             like++
    //         }else{
    //             throw new BadRequestError("Você não pode realizar duas ações no mesmo post")
    //         }
            
    //     }
    //     const postLike = new Posts (
    //         idToLikeOrDislike, 
    //         postToLike.content,
    //         postToLike.comment,
    //         postToLike.likes,
    //         postToLike.dislikes,
    //         postToLike.created_at,
    //         {id: postToLike.user_id,
    //         name:payload.username},
    //         {id: '',
    //         post_id: '',
    //         comment: '',
    //         likes: 0,
    //         dislikes: 0,
    //         created_at: '',
    //             user: {
    //                 user_id: '',
    //                 name: ''
    //         }
    //         }
    //     )

    //     const userId = payload.id
    //     const likesSended = like ? 1 : 0 

    //     const updateLikePost = {
    //         user_id: userId,
    //         post_id: idToLikeOrDislike,
    //         like: likesSended,
    //     }

    //     const postLikeDB = postLike.toPostModelsDB()
    //     await this.postsDatabase.updatePost(postLikeDB, idToLikeOrDislike)
    //     await this.postsDatabase.updateLikeOrDislikePost(updateLikePost)

    //     if(commentToLike){
    //         let like = commentToLike.likes
    //         let dislike = commentToLike.dislikes

    //         if(like === 0){
    //             dislike++
    //         }else if(like === 1){
    //             like++
    //         }else{
    //             throw new BadRequestError("Você não pode realizar duas ações no mesmo post")
    //         }
            
    //     }

    //     const commentLike = new Posts (
    //         idToLikeOrDislike, 
    //         commentToLike.content,
    //         commentToLike.comment,
    //         commentToLike.likes,
    //         commentToLike.dislikes,
    //         commentToLike.created_at,
    //         {id: commentToLike.user_id,
    //         name:payload.username},
    //         {id: '',
    //         post_id: '',
    //         comment: '',
    //         likes: 0,
    //         dislikes: 0,
    //         created_at: '',
    //             user: {
    //                 user_id: '',
    //                 name: ''
    //         }
    //         }
    //     )
    //     const updateLikeComment = {
    //         user_id: userId,
    //         comment_id: idToLikeOrDislike,
    //         like: likesSended,
    //     }
    //     const commentLikeDB = commentLike.toPostModelsDB()
    //     await this.postsDatabase.updateComment(commentLikeDB, idToLikeOrDislike)
    //     await this.postsDatabase.updateLikeOrDislikeComment(updateLikeComment)
    // }

}