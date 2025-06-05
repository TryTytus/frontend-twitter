import type { PostWithUser } from "./post";

export class PostRepository {
  static getPostsWithUser(
    skip = 0,
    token?: string
  ): Promise<PostWithUser[] | []> {
    return fetch(`http://localhost:3000/post?skip=${skip}`, {
      credentials: 'include',
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error fetching posts: ${res.statusText}`);
        }
        return res.json();
      })
      .catch((error) => {
        console.error(error);
        return [];
      });
  }
}
