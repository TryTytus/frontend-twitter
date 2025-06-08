import type { PostWithUser } from "$lib/models/post";
import { PostRepository } from "$lib/models/post_repository";
import { UserRepository } from "$lib/models/user-api";
import type { PageLoad } from "./$types";
import type { User } from "$lib/models/user";

export const load: PageLoad = async ({ params }): Promise<{ user: User | null; posts: PostWithUser[] | [] }> => {

    const user = await UserRepository.getUserByNickname(params.id);
    const posts = await PostRepository.getPostsWithUserByNickname(params.id);

    return {
        user,
        posts
    }
}