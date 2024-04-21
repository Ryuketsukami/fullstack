import { Request, Response } from 'express';
import Post from '../models/Post';
import { PostBL } from '../BL/PostBL';
import User from '../models/User';

export class PostController {

    private postBL: PostBL;

    constructor(postBL: PostBL) {
        this.postBL = postBL;
    }

    async addPost(req: Request, res: Response): Promise<void> {
        const postData = req.body.post;
        const post = new Post(
            postData.post_id,
            postData.type,
            postData.meta_type,
            postData.date,
            postData.creator_id,
            postData.title,
            postData.preview_content,
            postData.thumbnail_src,
            postData.full_image,
            [...postData.content]
        );
        const userData = req.body.user;
        const user = new User(userData.email, userData.firstName, userData.userId, userData.picture, userData.role,
            userData.token, userData.posts, userData.favoritePosts, userData.friends, userData.secretUserId)
        try {
            await this.postBL.addPost(post, user);
            res.status(201).send({ message: `Post created successfully` });
        } catch (error) {
            res.status(400).send((error as Error).message);
        }
    }

    async getPost(req: Request, res: Response): Promise<void> {
        const postId = req.params.id;
        try {
            const post = await this.postBL.getPost(postId);
            res.status(200).send(post);
        } catch(error) {
            res.status(400).send((error as Error).message);
        }
    }

    async getAllPosts(req: Request, res: Response): Promise<void> {
        const category = req.params.category;
        const page = parseInt(req.params.page);
        const filter = req.params.filter;
        const user_id = req.params.user_id;

        try {
            const posts = await this.postBL.getAllPosts(page, filter, category, user_id);
            res.status(200).send(posts);
        } catch(error) {
            res.status(400).send((error as Error).message);
        }
    }

    async getNumberOfPosts(req: Request, res: Response): Promise<void> {
        const category = req.params.category;
        const filter = req.params.filter;

        try {
            const numberOfPosts = await this.postBL.getNumberOfPosts(filter, category);
            res.status(200).send(numberOfPosts);
        } catch(error) {
            res.status(400).send((error as Error).message);
        }
    }

    async updatePost(req: Request, res: Response): Promise<void> {
        const postId = +req.params.id;
        const postData = req.body.post;
        const userData = req.body.user;
        const user = new User(userData.email, userData.firstName, userData.userId, userData.picture, userData.role,
            userData.token, userData.posts, userData.favoritePosts, userData.friends, userData.secretUserId)
        try {
            await this.postBL.updatePost(postData.post_id.toString(), postData, user);
            res.status(200).send({ message: `Post ${postId} updated successfully` });
        } catch(error) {
            res.status(400).send((error as Error).message);
        }
    }

    async updatePostCard(req: Request, res: Response): Promise<void> {
        const postId = req.params.id;
        const postData = req.body.post;
        const userData = req.body.user;
        const user = new User(userData.email, userData.firstName, userData.userId, userData.picture, userData.role,
            userData.token, userData.posts, userData.favoritePosts, userData.friends, userData.secretUserId)
        try {
            await this.postBL.updatePostCard(postData.post_id.toString(), postData, user);
            res.status(200).send({ message: `Post ${postId} updated successfully` });
        } catch(error) {
            res.status(400).send((error as Error).message);
        }
    }

    async deletePost(req: Request, res: Response): Promise<void> {
        const postId = req.params.id;
        const userData = req.body.user;
        const user = new User(userData.email, userData.firstName, userData.userId, userData.picture, userData.role,
            userData.token, userData.posts, userData.favoritePosts, userData.friends, userData.secretUserId)
        try {
            await this.postBL.deletePost(postId, user);
            res.status(200).send({ message: `Post ${postId} deleted successfully` });
        } catch(error) {
            res.status(400).send((error as Error).message);
        }
    }

    // async editPost(req: Request, res: Response): Promise<void> {
    //     const postId = req.params.id;
    //     const userData = req.body.user;
    //     const user = new User(userData.email, userData.firstName, userData.userId, userData.picture, userData.role,
    //         userData.token, userData.posts, userData.favoritePosts, userData.friends, userData.secretUserId)
    //     try {
    //         await this.postBL.editPost(postId, user);
    //         res.status(200).send({ message: `Post ${postId} deleted successfully` });
    //     } catch(error) {
    //         res.status(400).send((error as Error).message);
    //     }
    // }

}
//window.json