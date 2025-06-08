import type { User } from "./user";


export class UserRepository {

    static async getUserById(userId: string): Promise<User | null> {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/byId/${userId}`);
            if (!response.ok) {
                throw new Error(`Error fetching user with ID ${userId}: ${response.statusText}`);
            }
            return await response.json();
        } catch (error) {
            console.error(error);
            return null;
        }
    }


    static async getUserByNickname(nickname: string): Promise<User | null> {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/byNickname/${nickname}`);
            if (!response.ok) {
                throw new Error(`Error fetching user with nickname ${nickname}: ${response.statusText}`);
            }
            return await response.json();
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}