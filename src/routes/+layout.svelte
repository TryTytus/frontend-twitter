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
  import { setContext } from "svelte";
  import { Toaster } from "$lib/components/ui/sonner";
  import { UserViewModel } from "$lib/viewmodels/user-viewmodel";

  if (browser) SuperTokens.init(SuperTokensConfig);

  const userViewModel = new UserViewModel();
  const { currentUser, loading, error } = userViewModel;

  let session = false;
  let userId: string | null = null;

  setContext("userViewModel", userViewModel);

  onMount(async () => {
    session = await Session.doesSessionExist();
    
    if (session) {
      userId = await Session.getUserId();
      setContext("userId", userId);
      
      if (userId) {
        await userViewModel.loadCurrentUser(userId);
      }
    } else {
      goto("/auth");
    }
  });
</script>

<div class="flex min-h-screen w-full flex-col">
  <div class="grid grid-flow-col lg:grid-cols-5">
    <Sidebar class="hidden lg:block sticky top-0 max-h-[200px]" />
    <div class="w-full col-span-3 flex">
      <Toaster />
      <slot {userId} user={$currentUser} />
    </div>
  </div>

  <ModeWatcher />
</div>
