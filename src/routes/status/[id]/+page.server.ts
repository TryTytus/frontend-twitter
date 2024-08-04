import type { PageServerLoad } from "./$types";

// export let csr = false

export let load: PageServerLoad = async ({cookies, params}) => {

    const token = cookies.get('sAccessToken');
    return {
        // post: await fetch(`http://localhost:3000/post/${params.id}`).then(res => res.json())
        post: await fetch(`http://localhost:3000/post/${params.id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }).then(res => res.json()),
        comments: await fetch(`http://localhost:3000/comment/${params.id}`).then(res => res.json()),
        likes: await fetch('http://localhost:3000/comment-likes', {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }).then(res => res.json())
    }
};
