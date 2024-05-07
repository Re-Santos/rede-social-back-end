"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Posts = void 0;
class Posts {
    constructor(id, content, comment, likes, dislikes, createdAt, user, post_comment) {
        this.id = id;
        this.content = content;
        this.comment = comment;
        this.likes = likes;
        this.dislikes = dislikes;
        this.createdAt = createdAt;
        this.user = user;
        this.post_comment = post_comment;
    }
    getId() {
        return this.id;
    }
    setId(value) {
        this.id = value;
    }
    getContent() {
        return this.content;
    }
    setContent(value) {
        this.content = value;
    }
    getLikes() {
        return this.likes;
    }
    setLikes(value) {
        this.likes = value;
    }
    getDislikes() {
        return this.dislikes;
    }
    setDislikes(value) {
        this.dislikes = value;
    }
    upLikes() {
        this.likes += 1;
    }
    downLikes() {
        this.likes -= 1;
    }
    removeDislikes() {
        this.likes += 1;
    }
    downDislikes() {
        this.likes -= 1;
    }
    getCreatedAt() {
        return this.createdAt;
    }
    setCreatedAt(value) {
        this.createdAt = value;
    }
    toPostModelsDB() {
        return {
            id: this.id,
            user_id: this.user.id,
            content: this.content,
            comment: this.comment,
            likes: this.likes,
            dislikes: this.dislikes,
            created_at: this.createdAt,
        };
    }
    toBusinessPostModels() {
        return {
            id: this.id,
            userId: this.user.id,
            content: this.content,
            comment: this.comment,
            likes: this.likes,
            dislikes: this.dislikes,
            createdAt: this.createdAt,
        };
    }
    toModelsCommentDB() {
        return {
            id: this.id,
            user_id: this.user.id,
            post_id: this.post_comment.post_id,
            comment: this.comment,
            likes: this.likes,
            dislikes: this.dislikes,
            created_at: this.createdAt
        };
    }
    toBusinessCommentModels() {
        return {
            id: this.id,
            userId: this.user.id,
            postId: this.post_comment.post_id,
            comment: this.comment,
            likes: this.likes,
            dislikes: this.dislikes,
            createdAt: this.createdAt,
        };
    }
    toPostDB() {
        return {
            id: this.id,
            user_id: this.user.id,
            content: this.content,
            comment: this.comment,
            likes: this.likes,
            dislikes: this.dislikes,
            created_at: this.createdAt,
        };
    }
}
exports.Posts = Posts;
