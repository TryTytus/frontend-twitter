<script lang="ts">
  import "../app.css";
  import { ModeWatcher } from "mode-watcher";
  import Sidebar from "$lib/custom/blocs/sidebar/sidebar.svelte";

  import * as SuperTokens from "supertokens-auth-react";
  import * as Session from "supertokens-auth-react/recipe/session";
  import { SuperTokensConfig } from "./auth/[...path]/config";

  import { browser } from "$app/environment";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  // import { userId, session } from "$lib/stores/session";
  import { get } from "svelte/store";
  import { setContext } from "svelte";

  import { Toaster } from "$lib/components/ui/sonner";

  let user: any;

  if (browser) SuperTokens.init(SuperTokensConfig);

  let session = false;
  let userId: string | null = null;

  // userId.subscribe((val) => (userIdValue = val));
  // session.subscribe((val) => (sessionValue = val));

  // setContext('userId', null);

  onMount(async () => {
    const name = sessionStorage.getItem("username");
    if (name === null) {
      userId = await Session.getUserId();
      const user = await fetch(`http://localhost:3000/user/${userId}`).then(
        (res) => res.json()
      );
      sessionStorage.setItem("username", user?.name);
      sessionStorage.setItem("nickname", user?.nickname);
    }

    session = await Session.doesSessionExist();
    if (session) {
      userId = await Session.getUserId();
      setContext("userId", null);
      user = await fetch(`http://localhost:3000/user/${userId}`)
        .then(async (res) => {
          console.log(await res.json());
          return res.json();
        })
        .catch((e) => console.error(e));

      } else goto("/auth");
  });
</script>

<div class="flex min-h-screen w-full flex-col">
  <div class="grid grid-flow-col lg:grid-cols-5">
    <Sidebar class="hidden lg:block sticky top-0 max-h-[200px]" />
    <div class="w-full col-span-3 flex">
      <Toaster />
      <slot {userId} />
    </div>
  </div>

  <ModeWatcher />
</div>
