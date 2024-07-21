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
  import { get } from 'svelte/store';
  import { setContext } from 'svelte';

  import { Toaster } from "$lib/components/ui/sonner";



  let user: any;

  if (browser) SuperTokens.init(SuperTokensConfig);

let session = false
let userId: string | null = null

  // userId.subscribe((val) => (userIdValue = val));
  // session.subscribe((val) => (sessionValue = val));

  // setContext('userId', null);

  onMount(async () => {
    session = await Session.doesSessionExist();
    if (session) {
      userId = await Session.getUserId();
      setContext('userId', null);
      user = await fetch(`http://localhost:3000/user/${userId}`)
        .then((res) => res.json())
        .catch((e) => console.error(e));
        
      if (user === undefined) goto("/getStarted");
    }
     else goto("/auth");
  });

</script>

<div class="flex min-h-screen w-full flex-col">
  <div class="grid grid-flow-col lg:grid-cols-5">
    <Sidebar class="hidden lg:block sticky top-0 max-h-[200px]" />
    <div class="w-full col-span-3 flex my-5">
      <Toaster />
      <slot {userId} />
    </div>
  </div>

  <ModeWatcher />

  
</div>
