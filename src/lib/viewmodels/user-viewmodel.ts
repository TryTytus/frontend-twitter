import { writable } from 'svelte/store';
import { BaseViewModel } from './base/base-viewmodel';
import { UserRepository } from '$lib/models/user-api';
import type { User } from '$lib/models/user';

export class UserViewModel extends BaseViewModel {
    private _currentUser = writable<User | null>(null);
    private _profileUser = writable<User | null>(null);

    public readonly currentUser = { subscribe: this._currentUser.subscribe };
    public readonly profileUser = { subscribe: this._profileUser.subscribe };

    async loadCurrentUser(userId: string): Promise<void> {
        const user = await this.executeWithLoading(async () => {
            return await UserRepository.getUserById(userId);
        });

        if (user) {
            this._currentUser.set(user);
            this.updateSessionStorage(user);
        }
    }

    async loadProfileUser(userId: string): Promise<void> {
        const user = await this.executeWithLoading(async () => {
            return await UserRepository.getUserById(userId);
        });

        if (user) {
            this._profileUser.set(user);
        }
    }

    async updateProfile(formData: FormData): Promise<boolean> {
        const success = await this.executeWithLoading(async () => {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/updateProfile`, {
                method: "POST",
                body: formData,
                credentials: 'include'
            });
            return res.ok;
        });

        if (success) {
            // Reload current user data
            const currentUserId = await this.getCurrentUserId();
            if (currentUserId) {
                await this.loadCurrentUser(currentUserId);
            }
        }

        return success || false;
    }

    private updateSessionStorage(user: User): void {
        if (typeof sessionStorage !== 'undefined') {
            sessionStorage.setItem("username", user.name || "");
            sessionStorage.setItem("nickname", user.nickname || "");
            sessionStorage.setItem("bgimg", user.avatar || "morty.jpeg");
        }
    }

    private async getCurrentUserId(): Promise<string | null> {
        if (typeof window !== 'undefined') {
            const { default: Session } = await import('supertokens-auth-react/recipe/session');
            return await Session.getUserId();
        }
        return null;
    }
}
