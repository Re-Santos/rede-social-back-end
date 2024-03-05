import { PostsModels } from "../../types"

export interface GetPostInput {
    token: string | undefined
}

export type GetPostOutput = PostsModels []

export interface CreatePostInput {
    token: string,
    content: unknown
}

export interface LikeOrDislikeInput {
    idToLikeOrDislike: string,
    token: string | undefined,
    like: unknown
}
export interface createCommentInput{
    post_id: string,
    comment: string,
    token: string 
}