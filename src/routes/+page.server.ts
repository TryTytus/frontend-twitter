import type { PageServerLoad } from "./$types";

export let load: PageServerLoad = async ({ cookies }) => {
  const token = cookies.get("sAccessToken");
  return {
    token
  };
};
