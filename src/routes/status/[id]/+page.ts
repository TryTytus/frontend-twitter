import type { PageLoad } from "./$types";

export let load: PageLoad = async ({params}) => {
    return {
        // post: await fetch(`http://localhost:3000/post/${params.id}`).then(res => res.json())
        comments: await fetch('http://localhost:3000/comment').then(res => res.json())
    }
};
