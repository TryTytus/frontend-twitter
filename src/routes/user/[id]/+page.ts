import type { PageLoad } from "./$types";

interface PostUser {
  nickname: string;
  name: string;
}

interface Post {
  id: string; 
  user: PostUser;
  content: string;
  likesCount: number;
  isLiked: boolean;
  commentsCount: number;
  viewsCont: number; 
  isBookmarked: boolean;
  createdAt: string; 
}

interface User {
  bgimg?: string;
  avatar?: string;
  name: string;
  nickname: string;
  description?: string;
}

export const load: PageLoad = async ({ params }): Promise<{ user: User | null; posts: Post[] | null }> => {
    return {
        user: await fetch(`http://localhost:3000/user/byNickname/${params.id}`)
        .then(res => res.json()),

        posts: await fetch(`http://localhost:3000/post`)
        .then(res => res.json())
    }
}