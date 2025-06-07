import { writable } from 'svelte/store';
import { BaseViewModel } from './base/base-viewmodel';
import { CommentRepository, type Comment, type CommentLike } from '$lib/models/comment_repository';

export class CommentViewModel extends BaseViewModel {
    private _comments = writable<Comment[]>([]);
    private _commentLikes = writable<Set<string>>(new Set());
    private _postId = writable<string>('');

    public readonly comments = { subscribe: this._comments.subscribe };
    public readonly commentLikes = { subscribe: this._commentLikes.subscribe };

    constructor(postId: string, private token?: string) {
        super();
        this._postId.set(postId);
    }

    async setComments(comments: Comment[]): Promise<void> {
        this._comments.set(comments);
    }

    async loadComments(): Promise<void> {
        let currentPostId: string;
        this._postId.subscribe(id => currentPostId = id)();

        const comments = await this.executeWithLoading(async () => {
            return await CommentRepository.getCommentsByPostId(currentPostId);
        });

        if (comments) {
            this._comments.set(comments);
        }
    }

    async loadCommentLikes(): Promise<void> {
        const likes = await this.executeWithLoading(async () => {
            return await CommentRepository.getCommentLikes(this.token);
        });

        if (likes) {
            const likeIds = new Set(likes.map(like => like.commentInfoId.trim()));
            this._commentLikes.set(likeIds);
        }
    }

    async addComment(content: string, path?: string): Promise<void> {
        let currentPostId: string;
        this._postId.subscribe(id => currentPostId = id)();

        const newComment = await this.executeWithLoading(async () => {
            return await CommentRepository.addComment(currentPostId, content, path);
        });

        if (newComment) {
            const userInfo = this.getUserInfo();
            const comment: Comment = {
                content,
                name: userInfo.name,
                bgimg: userInfo.bgimg,
                likesCount: 0,
                comments: []
            };

            if (path) {
                // Add to nested comment
                this.addNestedComment(path, comment);
            } else {
                // Add to root comments
                this._comments.update(comments => [comment, ...comments]);
            }
        }
    }

    async toggleCommentLike(commentId: string, path: string, currentLikesCount: number): Promise<{ isLiked: boolean; likesCount: number }> {
        let currentPostId: string;
        let currentLikes: Set<string>;
        
        this._postId.subscribe(id => currentPostId = id)();
        this._commentLikes.subscribe(likes => currentLikes = likes)();

        const isCurrentlyLiked = currentLikes.has(commentId);
        
        const success = await this.executeWithLoading(async () => {
            return await CommentRepository.toggleCommentLike(path, currentPostId, isCurrentlyLiked);
        });

        if (success) {
            const newLikes = new Set(currentLikes);
            if (isCurrentlyLiked) {
                newLikes.delete(commentId);
            } else {
                newLikes.add(commentId);
            }
            this._commentLikes.set(newLikes);

            return {
                isLiked: !isCurrentlyLiked,
                likesCount: isCurrentlyLiked ? currentLikesCount - 1 : currentLikesCount + 1
            };
        }

        return { isLiked: isCurrentlyLiked, likesCount: currentLikesCount };
    }

    private addNestedComment(path: string, comment: Comment): void {
        this._comments.update(comments => {
            const pathParts = path.split('.');
            let current: any = { comments };
            
            for (let i = 0; i < pathParts.length - 1; i += 2) {
                const index = parseInt(pathParts[i]);
                current = current.comments[index];
            }
            
            if (!current.comments) current.comments = [];
            current.comments.unshift(comment);
            
            return comments;
        });
    }

    private getUserInfo(): { name: string; bgimg: string } {
        if (typeof sessionStorage !== 'undefined') {
            return {
                name: sessionStorage.getItem('username') || 'Anonymous',
                bgimg: sessionStorage.getItem('bgimg') || 'morty.jpeg'
            };
        }
        return { name: 'Anonymous', bgimg: 'morty.jpeg' };
    }
}
