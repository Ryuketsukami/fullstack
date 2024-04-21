import express, { Request, Response } from 'express';
import { PostController } from '../controllers/PostController';
import { PostBL } from '../BL/PostBL';
import { PostRepository } from '../DAL/PostRepository';
import {UserDataAccess} from "../DAL/UserDataAccess";

const router = express.Router();
const postController = new PostController(new PostBL(new PostRepository(), new UserDataAccess()));

router.get('/:category/:page/:filter/:user_id', async (req: Request, res: Response) => await postController.getAllPosts(req,res));
router.get('/:category/:filter', async (req: Request, res: Response) => await postController.getNumberOfPosts(req,res));
router.post('/', async (req: Request, res: Response) => await postController.addPost(req,res));
router.get('/:id', async (req: Request, res: Response) => await postController.getPost(req,res));
router.put('/:id', async (req: Request, res: Response) => await postController.updatePost(req,res));
router.patch('/:id', async (req: Request, res: Response) => await postController.updatePostCard(req,res));
router.delete('/:id', async (req: Request, res: Response) => await postController.deletePost(req,res));

export default router;