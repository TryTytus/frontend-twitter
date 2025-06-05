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
  import { get } from "svelte/store";
  import { setContext } from "svelte";
  import { Toaster } from "$lib/components/ui/sonner";
  import { UserRepository } from "$lib/models/user-api";
  import User from "$lib/custom/blocs/chat-app/User.svelte";

  let user: any;

  if (browser) SuperTokens.init(SuperTokensConfig);

  let session = false;
  let userId: string | null = null;


  onMount(async () => {
    const name = sessionStorage.getItem("username");
    if (name === null || name == "undefined") {
      userId = await Session.getUserId();

      console.error(userId)

      

      const user = await UserRepository.getUserById(userId)

      console.warn(user)

      sessionStorage.setItem("username", user?.name);
      sessionStorage.setItem("nickname", user?.nickname);
      sessionStorage.setItem("bgimg", user?.avatar || "morty.jpeg");

      console.warn(user?.bgimg)
    }

    
    session = await Session.doesSessionExist();
    if (session) {
      userId = await Session.getUserId();
      setContext("userId", null);
      user = await UserRepository.getUserById(userId)
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
