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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsDatabase = void 0;
const BaseDatabase_1 = require("./BaseDatabase");
const UserDatabase_1 = __importDefault(require("./UserDatabase"));
class PostsDatabase extends BaseDatabase_1.BaseDatabase {
    constructor() {
        super(...arguments);
        this.getAllPosts = () => __awaiter(this, void 0, void 0, function* () {
            const result = yield BaseDatabase_1.BaseDatabase
                .connection(PostsDatabase.TABLE_POSTS)
                .select();
            return result;
        });
        this.getPostCreator = () => __awaiter(this, void 0, void 0, function* () {
            const postDB = yield this.getAllPosts();
            const userDB = yield BaseDatabase_1.BaseDatabase
                .connection(UserDatabase_1.default.TABLE_USERS)
                .select();
            return {
                postDB,
                userDB,
            };
        });
        this.insertPost = (postDB) => __awaiter(this, void 0, void 0, function* () {
            const result = yield BaseDatabase_1.BaseDatabase.connection(PostsDatabase.TABLE_POSTS).insert(postDB);
        });
        this.getPostById = (id) => __awaiter(this, void 0, void 0, function* () {
            const [result] = yield BaseDatabase_1.BaseDatabase.connection(PostsDatabase.TABLE_POSTS).select().where({ id: id });
            return result;
        });
        // this.createComment = (newCommentDB) => __awaiter(this, void 0, void 0, function* () {
        //     yield BaseDatabase_1.BaseDatabase.connection(PostsDatabase.TABLE_COMMENTS).insert(newCommentDB);
        // });
        // this.updatePost = (newUpDatePostDB, id) => __awaiter(this, void 0, void 0, function* () {
        //     yield BaseDatabase_1.BaseDatabase.connection(PostsDatabase.TABLE_POSTS).update(newUpDatePostDB).where({ id: id });
        // });
        // this.getCommentById = (id) => __awaiter(this, void 0, void 0, function* () {
        //     const result = yield BaseDatabase_1.BaseDatabase
        //         .connection(PostsDatabase.TABLE_COMMENTS)
        //         .select()
        //         .where({ post_id: id });
        //     return result[0];
        // });
        // this.updateLikeOrDislikePost = (updateLike) => __awaiter(this, void 0, void 0, function* () {
        //     yield BaseDatabase_1.BaseDatabase
        //         .connection(PostsDatabase.TABLE_POSTS_LIKEDISLIKE)
        //         .insert(updateLike);
        // });
        // this.updateComment = (updateComment, id) => __awaiter(this, void 0, void 0, function* () {
        //     yield BaseDatabase_1.BaseDatabase.connection(PostsDatabase.TABLE_COMMENTS).update(updateComment).where({ id: id });
        // });
        // this.updateLikeOrDislikeComment = (updateLikeComment) => __awaiter(this, void 0, void 0, function* () {
        //     yield BaseDatabase_1.BaseDatabase.connection(PostsDatabase.TABLE_COMMENTS_LIKEDISLIKE).insert(updateLikeComment);
        // });
    }
}
exports.PostsDatabase = PostsDatabase;
PostsDatabase.TABLE_POSTS = "posts";
PostsDatabase.TABLE_USERS = "users";
PostsDatabase.TABLE_COMMENTS = "comments_posts";
PostsDatabase.TABLE_POSTS_LIKEDISLIKE = "posts_likes_dislikes";
PostsDatabase.TABLE_COMMENTS_LIKEDISLIKE = "comments_likes_dislikes";
