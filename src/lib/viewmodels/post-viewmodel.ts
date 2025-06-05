import { writable, derived } from 'svelte/store';
import { BaseViewModel } from './base/base-viewmodel';
import { PostRepository } from '$lib/models/post_repository';
import type { PostWithUser } from '$lib/models/post';

export class PostViewModel extends BaseViewModel {
    private _posts = writable<PostWithUser[]>([]);
    private _skip = writable(0);
    private _hasMorePosts = writable(true);

    public readonly posts = { subscribe: this._posts.subscribe };
    public readonly hasMorePosts = { subscribe: this._hasMorePosts.subscribe };

    constructor(private token?: string) {
        super();
    }

    async loadInitialPosts(): Promise<void> {
        const posts = await this.executeWithLoading(async () => {
            return await PostRepository.getPostsWithUser(0);
        });

        if (posts) {
            this._posts.set(posts);
            this._skip.set(15);
            this._hasMorePosts.set(posts.length === 15);
        }
    }

    async loadMorePosts(): Promise<void> {
        let currentSkip: number;
        let currentPosts: PostWithUser[];
        
        this._skip.subscribe(skip => currentSkip = skip)();
        this._posts.subscribe(posts => currentPosts = posts)();

        const newPosts = await this.executeWithLoading(async () => {
            return await PostRepository.getPostsWithUser(currentSkip!, this.token);
        });

        if (newPosts) {
            this._posts.update(posts => [...posts, ...newPosts]);
            this._skip.update(skip => skip + 15);
            this._hasMorePosts.set(newPosts.length === 15);
        }
    }

    async toggleLike(postId: string): Promise<void> {
        this._posts.update(posts => 
            posts.map(post => 
                post.id === postId 
                    ? { ...post, isLiked: !post.isLiked, likesCount: post.isLiked ? post.likesCount - 1 : post.likesCount + 1 }
                    : post
            )
        );
    }

    async toggleBookmark(postId: string): Promise<void> {
        this._posts.update(posts => 
            posts.map(post => 
                post.id === postId 
                    ? { ...post, isBookmarked: !post.isBookmarked }
                    : post
            )
        );
    }
}
