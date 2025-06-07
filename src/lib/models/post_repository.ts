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


  static getPostById(id: string, token?: string): Promise<PostWithUser | null> {
    return fetch(`http://localhost:3000/post/${id}`, {
      credentials: 'include',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error fetching post with ID ${id}: ${res.statusText}`);
        }
        return res.json();
      })
      .catch((error) => {
        console.error(error);
        return null;
      });
  }
}
