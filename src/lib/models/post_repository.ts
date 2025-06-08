import type { PostWithUser } from "./post";

export class PostRepository {
  static getPostsWithUser(
    skip = 0,
    token?: string
  ): Promise<PostWithUser[] | []> {
    return fetch(`${import.meta.env.VITE_BACKEND_URL}/post?skip=${skip}`, {
      credentials: "include",
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
    return fetch(`${import.meta.env.VITE_BACKEND_URL}/post/${id}`, {
      credentials: "include",
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(
            `Error fetching post with ID ${id}: ${res.statusText}`
          );
        }
        return res.json();
      })
      .catch((error) => {
        console.error(error);
        return null;
      });
  }

    static getPostsWithUserByNickname(
    userId: string,
    token?: string
  ): Promise<PostWithUser[] | []> {
    return fetch(`${import.meta.env.VITE_BACKEND_URL}/user/posts/${userId}`, {
      credentials: "include",
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

  static async likePost(
    postId: number,
    dislike = false,
    token?: string
  ): Promise<void | null> {
    try {
      const type = dislike ? "dislike" : "like";
      await fetch(`${import.meta.env.VITE_BACKEND_URL}/post-likes/${type}/${postId}`, {
        method: "POST",
        credentials: "include",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  static async bookmarkPost(
    postId: number,
    isBookmarked: boolean,
    token?: string
  ): Promise<void | null> {
    try {
      await fetch(`${import.meta.env.VITE_BACKEND_URL}/bookmark/${postId}`, {
        method: !isBookmarked ? "POST" : "DELETE",
      });
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  static async addPost(content: string, token?: string) {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/post`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ content }),
    });
  }
}
