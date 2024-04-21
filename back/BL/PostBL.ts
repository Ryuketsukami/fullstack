import {DataAccess} from '../DAL/DataAccess';
import { UserDataAccess } from '../DAL/UserDataAccess';
import Post from '../models/Post';
import User from "../models/User";

export class PostBL {
    private postDataAccess: DataAccess<Post>;
    private userDataAccess: UserDataAccess;

    constructor(postDataAccess: DataAccess<Post>, userDataAccess: UserDataAccess) {
        this.postDataAccess = postDataAccess;
        this.userDataAccess = userDataAccess;
    }
    async addPost(post: Post, user: User): Promise<void> {
        try {
            await this.postDataAccess.add(post, user.secretUserId);
        } catch (error) {
            throw new Error(`Unable to add Post: ${(error as Error).message}`);
        }
    }

    async getPost(postId: string): Promise<Post> {
        const post = await this.postDataAccess.get(postId);
        if (!post) {
            throw new Error(`Post with ID ${postId} not found`);
        }
        return post;
    }

    async getAllPosts(page: number, filter: string, category: string, user_id: string): Promise<Array<Post>> {
        const post = await this.postDataAccess.getAll(page, filter, category, user_id);
        if (!post) {
            // not sure if I will want to keep the following line
            throw new Error(`No Posts!`);
        }
        return post;
    }

    async getNumberOfPosts(filter: string, category: string): Promise<number> {
        return await this.postDataAccess.getLength(filter, category);
    }

    async updatePost(postId: string, updateData: Partial<Post>, user: User): Promise<void> {
        try {
            await this.postDataAccess.update(postId, updateData, user.secretUserId);
        } catch (error) {
            throw new Error(`Unable to update Post: ${(error as Error).message}`);
        }
    }

    async updatePostCard(postId: string, updateData: Partial<Post>, user: User): Promise<void> {
        try {
            await this.postDataAccess.updateCard(postId, updateData, user.secretUserId);
        } catch (error) {
            throw new Error(`Unable to update Post: ${(error as Error).message}`);
        }
    }

    async deletePost(postId: string, user: User): Promise<void> {
        try {
            await this.postDataAccess.delete(postId, user.secretUserId);
        } catch (error) {
            throw new Error(`Unable to delete Post: ${(error as Error).message}`);
        }
    }
}