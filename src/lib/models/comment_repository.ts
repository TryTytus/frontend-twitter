export interface Comment {
  _id?: string;
  content: string;
  name: string;
  bgimg?: string;
  likesCount: number;
  comments?: Comment[];
}

export interface CommentLike {
  commentInfoId: string;
}

export class CommentRepository {
  static async getCommentsByPostId(postId: string, token?: string): Promise<Comment[]> {
    try {
      const response = await fetch(`http://localhost:3000/comment/${postId}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        credentials: 'include'
      });
      if (!response.ok) throw new Error(`Error: ${response.statusText}`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching comments:', error);
      return [];
    }
  }

  static async getCommentLikes(token?: string): Promise<CommentLike[]> {
    try {
      const response = await fetch('http://localhost:3000/comment-likes', {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        credentials: 'include'
      });
      if (!response.ok) throw new Error(`Error: ${response.statusText}`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching comment likes:', error);
      return [];
    }
  }

  static async addComment(postId: string, value: string, path?: string): Promise<Comment | null> {
    try {
      const url = path 
        ? `http://localhost:3000/comment?path=${path}&postId=${postId}`
        : `http://localhost:3000/comment?postId=${postId}`;
      
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: value }),
        credentials: 'include'
      });
      
      if (!response.ok) throw new Error(`Error: ${response.statusText}`);
      return await response.json();
    } catch (error) {
      console.error('Error adding comment:', error);
      return null;
    }
  }

  static async addTopComment(postId: string, content: string): Promise<Comment | null> {
    try {
      const response = await fetch(`http://localhost:3000/comment?postId=${postId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content,
        }),
      });
      if (!response.ok) throw new Error(`Error: ${response.statusText}`);
      return await response.json();
    } catch (error) {
      console.error('Error adding top comment:', error);
      return null;
    }
  }

  static async toggleCommentLike(path: string, postId: string, isLiked: boolean): Promise<boolean> {
    try {
      const type = isLiked ? 'dislike' : 'like';
      const response = await fetch(`http://localhost:3000/comment/${type}?path=${path}&postId=${postId}`, {
        method: 'POST',
        credentials: 'include'
      });
      return response.ok;
    } catch (error) {
      console.error('Error toggling comment like:', error);
      return false;
    }
  }
}
