
import type { User } from './user';


export type PostWithUser = {
    id: string;
    content: string;

    likesCount: number;
    viewsCont: number; 
    commentsCount: number;

    isLiked: boolean;
    isBokmarked: boolean;

    userId: string;
    isBookmarked: boolean;
    createdAt: string; 

    user: User;
}