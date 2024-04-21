import { UserDataAccess } from '../DAL/UserDataAccess';
import User from '../models/User';
import {OAuth2Client} from "google-auth-library";

const GOOGLE_AUTH_CLIENT_ID = process.env.GOOGLE_AUTH_CLIENT_ID;
const client = new OAuth2Client(GOOGLE_AUTH_CLIENT_ID);

export class UserBL {
    private userDataAccess: UserDataAccess;

    constructor(userDataAccess: UserDataAccess) {
        this.userDataAccess = userDataAccess;
    }

    async addUser(credential: string): Promise<User|undefined> {
        let profile;
        if (credential) {
            const verificationResponse = await verifyGoogleToken(credential);

            if (verificationResponse.error) {
                throw new Error('Error verifying credential');
            }
            profile = verificationResponse?.payload;
        }
        try {

            return await this.userDataAccess.addUser(JSON.stringify(profile));
        } catch (error) {
            throw new Error(`Unable to add user: ${(error as Error).message}`);
        }
    }

    async getUser(userId: string): Promise<User> {
        const user = await this.userDataAccess.getUser(userId);
        if (!user) {
            throw new Error(`User with ID ${userId} not found`);
        }
        return user;
    }

    // async updateUser(userId: number, updateData: Partial<User>): Promise<void> {
    //     try {
    //         await this.userDataAccess.updateUser(userId, updateData);
    //     } catch (error) {
    //         throw new Error(`Unable to update user: ${(error as Error).message}`);
    //     }
    // }
    //
    // async deleteUser(userId: number): Promise<void> {
    //     try {
    //         await this.userDataAccess.deleteUser(userId);
    //     } catch (error) {
    //         throw new Error(`Unable to delete user: ${(error as Error).message}`);
    //     }
    // }
}

async function verifyGoogleToken(token: string) {
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: GOOGLE_AUTH_CLIENT_ID,
        });
        return { payload: ticket.getPayload() };
    } catch (error) {
        return { error: "Invalid user detected. Please try again" };
    }
}