import type { Comment } from "$lib/models/comment_repository";
import { writable } from "svelte/store";


export let comments = writable<Comment[]>([]);