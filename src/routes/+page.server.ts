import type { PageServerLoad } from "./$types";


export let load: PageServerLoad = async ({ cookies }) => {
  const token = cookies.get('sAccessToken');
  const posts = {
    posts: await fetch("http://localhost:3000/post", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json()),
  };
  return posts;
};
