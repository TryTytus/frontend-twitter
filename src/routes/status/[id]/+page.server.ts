import { CommentRepository } from "$lib/models/comment_repository";
import { PostRepository } from "$lib/models/post_repository";
import type { PageServerLoad } from "./$types";

// export let csr = false

export let load: PageServerLoad = async ({cookies, params}) => {

    const token = cookies.get('sAccessToken');
    return {
        post: await PostRepository.getPostById(params.id, token),
        comments: await CommentRepository.getCommentsByPostId(params.id, token),
        likes: await CommentRepository.getCommentLikes(token),
    }
};
