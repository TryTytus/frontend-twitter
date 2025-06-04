import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ params }) => {
    return {
        user: await fetch(`http://localhost:3000/user/${params.id}`)
        .then(res => res.json()),

        posts: await fetch(`http://localhost:3000/post`)
        .then(res => res.json())
    }
}