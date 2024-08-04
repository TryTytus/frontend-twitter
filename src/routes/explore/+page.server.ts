import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ url, cookies }) => {
  let sort = url.searchParams.get("sort");

  if (sort === null) sort = "top";

  const mapper = {
    latest: "createdAt",
    top: "likesCount",
  };

  const mapper2 = new Map([
    ["latest", "createdAt"],
    ["top", "likesCount"],
  ]);

  const token = cookies.get("sAccessToken");

  return {
    posts: await fetch(
      `http://localhost:3000/post?orderBy=${mapper2.get(sort) || "createdAt"}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ).then((res) => {
      console.log(res.url);
      return res.json();
    }),
  };
};
