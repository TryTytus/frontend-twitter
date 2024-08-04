<script lang="ts">
  // import type { Playlist } from "../(data)/playlists.js";
  import { cn } from "$lib/utils.js";
  import { ScrollArea } from "$lib/components/ui/scroll-area/index.js";
  import * as Dialog from "$lib/components/ui/dialog/index.js";

  import { Button, buttonVariants } from "$lib/components/ui/button/index.js";

  import {
    Bell,
    Bird,
    BookmarkIcon,
    Home,
    Mail,
    Search,
    SquareArrowRight,
    User,
  } from "lucide-svelte";
  import SidebarButton from "./sidebar-button.svelte";
  import { goto } from "$app/navigation";
  import Session from "supertokens-auth-react/recipe/session";
  import { browser } from "$app/environment";
  import CreateDialog from "../create-post-dialog/create-dialog.svelte";

  let className: string | null | undefined = undefined;
  // export let playlists: Playlist[];
  export { className as class };

  let logout = async () => {
    console.log("logout");
    await Session.signOut();
    await goto("/auth");
  };
</script>

<div class={cn("pb-12", className)}>
  <div class="space-y-4 py-4">
    <div class="px-3 py-2">
      <h2 class="text-lg font-semibold m-4 mb-6">Twitter</h2>

      <div class="space-y-1">

		

        <SidebarButton on:click={() => goto('/')} variant="secondary">
          <Home class="w-4" />
          Home
        </SidebarButton>
        <SidebarButton on:click={() => goto('/explore')}>
          <Search class="w-4" />
          Explore
        </SidebarButton>
        <SidebarButton>
          <Bell class="w-4" />
          Notifications
        </SidebarButton>
        <SidebarButton  on:click={() => goto('/chat')}>
          <Mail class="w-4" />
          Messages
        </SidebarButton>
        <SidebarButton on:click={() => goto('/bookmarks')}>
          <BookmarkIcon class="w-4" />
          Bookmarks
        </SidebarButton>

		<CreateDialog>
			<Dialog.Trigger class={`${buttonVariants({ variant: "ghost" })} w-full`}>
			  <div class="flex w-full h-full gap-3 items-center">
				  <Bird class="w-4" />
				  Tweet
			  </div>
			</Dialog.Trigger>
		  </CreateDialog>

        <SidebarButton on:click={() => goto(`/user/${sessionStorage.getItem('nickname')}`)}>
          <User class="w-4" />
          Profile
        </SidebarButton>

        <SidebarButton on:click={logout}>
          <SquareArrowRight class="w-4" />
          Logout
        </SidebarButton>
      </div>
    </div>

    <div class="py-2">
      <ScrollArea class="h-[300px] px-1">
        <div class="space-y-1 p-2">

        </div>
      </ScrollArea>
    </div>
  </div>
</div>
