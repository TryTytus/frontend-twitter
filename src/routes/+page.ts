import type { PageLoad } from "./$types";

export let load: PageLoad = async () => {
  return {
    posts: await fetch("http://localhost:3000/post").then((res) => res.json()),
  };
};
