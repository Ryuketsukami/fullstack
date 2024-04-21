import { Request, Response } from 'express';
import { UserBL } from '../BL/UserBL';

export class UserController {
    private userBL: UserBL;

    constructor(userBL: UserBL) {
        this.userBL = userBL;
    }

    async addUser(req: Request, res: Response) {
        const userData = req.body;

        try {
            // const user = new User(userData.id, userData.username, userData.email);
            const user = await this.userBL.addUser(userData.credential);
            res.status(201).send({
                message: "Signup was successful",
                user: user
            });
        } catch (error) {
            res.status(400 ).send((error as Error).message);
        }
    }

    async getUser(req: Request, res: Response) {
        const user_id = req.params.user_id.toString();
        try {
            const user = await this.userBL.getUser(user_id);
            user.secretUserId = '';
            res.status(200).send(user);
        } catch(error) {
            res.status(400).send((error as Error).message);
        }
    }
    //
    // async updateUser(req: Request, res: Response) {
    //     const userId = +req.params.id;
    //     const userData = req.body;
    //     try {
    //         await this.userBL.updateUser(userId, userData);
    //         res.status(200).send({ message: `User ${userId} updated successfully` });
    //     } catch(error) {
    //         res.status(400).send((error as Error).message);
    //     }
    // }
    //
    // async deleteUser(req: Request, res: Response) {
    //     const userId = +req.params.id;
    //     try {
    //         await this.userBL.deleteUser(userId);
    //         res.status(200).send({ message: `User ${userId} deleted successfully` });
    //     } catch(error) {
    //         res.status(400).send((error as Error).message);
    //     }
    // }
}