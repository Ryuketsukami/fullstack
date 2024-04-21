import User from '../models/User';
import uuid4 from "uuid4";
import jwt from "jsonwebtoken";
import { getClient } from './DBConnect';

export class UserDataAccess {
    private client = getClient();

    async addUser(stringProfile: string): Promise<User> {
        const profile = JSON.parse(stringProfile);
        const mySecret = process.env.GOOGLE_AUTH_CLIENT_SECRET;
        if(mySecret === undefined){
            throw new Error("can't locate secret from env.");
        }
        try{
            const response = await this.client.query(
                `SELECT *
                FROM blog_user
                WHERE $1 = email
                `, [profile?.email]
            );

            if (response.rows.length){
                const user = response.rows[0];
                return new User(
                    user.email,
                    user.given_name,
                    user.user_id,
                    user.picture,
                    user.role,
                    jwt.sign({ email: user.email }, mySecret, {expiresIn: "1d",}),
                    user.posts,
                    user.favorite_posts,
                    user.friends,
                    user.secret_user_id
                );
            }

            const user_id = uuid4().split('-').join('');
            const secret_user_id = uuid4().split('-').join('');
            await this.client.query('INSERT INTO blog_user (email, given_name, user_id, picture, role, posts, favorite_posts, friends, secret_user_id) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)',
                [
                    profile?.email,
                    profile?.given_name,
                    user_id,
                    profile?.picture,
                    'member',
                    [],
                    [],
                    [],
                    secret_user_id
                ]
            );

            return new User(
                profile?.email,
                profile?.given_name,
                user_id,
                profile?.picture,
                'member',
                jwt.sign({ email: profile?.email }, mySecret, {expiresIn: "1d",}),
                [], [], [], secret_user_id
            );
        } catch (e) {
            console.log(e);
            throw new Error(`error creating user from response: ${e}`);
        }

    }

    async getUser(userId: string): Promise<User> {
        const response = await this.client.query(`SELECT * FROM blog_user WHERE user_id = '${userId}'`);
        if (!response.rows.length) {
            throw new Error(`User with ID ${userId} not found`);
        }
        const userData = response.rows[0];
        try{
            return new User(
                userData.email,
                userData.given_name,
                userData.user_id,
                userData.picture,
                userData.role,
                '',
                userData.posts,
                userData.favorite_posts,
                userData.friends,
                userData.secret_user_id
            );
        }catch (e) {
            console.log(e);
            throw new Error(`Error fetching from pg:${e}`)
        }

    }

    // updateUser(userId: number, updateData: Partial<User>): void {
    //     const existingUser = this.db.getUser(userId);
    //     if (!existingUser) {
    //         throw new Error(`User with ID ${userId} not found`);
    //     }
    //     this.db.updateUser(userId, updateData);
    // }

    // deleteUser(userId: number): void {
    //     const existingUser = this.db.getUser(userId);
    //     if (!existingUser) {
    //         throw new Error(`User with ID ${userId} not found`);
    //     }
    //     this.db.deleteUser(userId);
    // }
}