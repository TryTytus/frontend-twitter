import { writable } from "svelte/store";

export const commentLikes = writable(new Set<string>())