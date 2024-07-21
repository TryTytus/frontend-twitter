import { writable, type Writable } from "svelte/store";


export let session = writable(false)
export let userId: Writable<string | null> = writable(null)