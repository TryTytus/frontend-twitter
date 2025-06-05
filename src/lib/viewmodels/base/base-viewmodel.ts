import { writable, type Writable } from 'svelte/store';

export abstract class BaseViewModel {
    protected _loading: Writable<boolean> = writable(false);
    protected _error: Writable<string | null> = writable(null);

    public readonly loading = { subscribe: this._loading.subscribe };
    public readonly error = { subscribe: this._error.subscribe };

    protected setLoading(loading: boolean) {
        this._loading.set(loading);
    }

    protected setError(error: string | null) {
        this._error.set(error);
    }

    protected async executeWithLoading<T>(operation: () => Promise<T>): Promise<T | null> {
        try {
            this.setLoading(true);
            this.setError(null);
            return await operation();
        } catch (error) {
            this.setError(error instanceof Error ? error.message : 'An error occurred');
            return null;
        } finally {
            this.setLoading(false);
        }
    }
}
