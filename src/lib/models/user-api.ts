

export class UserRepository {

    static async getUserById(userId: string): Promise<User | null> {
        try {
            const response = await fetch(`http://localhost:3000/user/byId/${userId}`);
            if (!response.ok) {
                throw new Error(`Error fetching user with ID ${userId}: ${response.statusText}`);
            }
            return await response.json();
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}