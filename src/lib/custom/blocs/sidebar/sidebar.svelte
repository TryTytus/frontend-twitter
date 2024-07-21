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

		

        <SidebarButton variant="secondary">
          <Home class="w-4" />
          Home
        </SidebarButton>
        <SidebarButton>
          <Search class="w-4" />
          Explore
        </SidebarButton>
        <SidebarButton>
          <Bell class="w-4" />
          Notifications
        </SidebarButton>
        <SidebarButton>
          <Mail class="w-4" />
          Messages
        </SidebarButton>
        <SidebarButton>
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

        <SidebarButton>
          <User class="w-4" />
          Profile
        </SidebarButton>

        <SidebarButton on:click={logout}>
          <SquareArrowRight class="w-4" />
          Logout
        </SidebarButton>
      </div>
    </div>
    <!-- <div class="px-3 py-2">
			<h2 class="mb-2 px-4 text-lg font-semibold tracking-tight">Library</h2>
			<div class="space-y-1">
				<Button variant="ghost" class="w-full justify-start">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="mr-2 h-4 w-4"
					>
						<path d="M21 15V6" />
						<path d="M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
						<path d="M12 12H3" />
						<path d="M16 6H3" />
						<path d="M12 18H3" />
					</svg>
					Playlists
				</Button>
				<Button variant="ghost" class="w-full justify-start">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="mr-2 h-4 w-4"
					>
						<circle cx="8" cy="18" r="4" />
						<path d="M12 18V2l7 4" />
					</svg>
					Songs
				</Button>
				<Button variant="ghost" class="w-full justify-start">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="mr-2 h-4 w-4"
					>
						<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
						<circle cx="12" cy="7" r="4" />
					</svg>
					Made for You
				</Button>
				<Button variant="ghost" class="w-full justify-start">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="mr-2 h-4 w-4"
					>
						<path d="m12 8-9.04 9.06a2.82 2.82 0 1 0 3.98 3.98L16 12" />
						<circle cx="17" cy="7" r="5" />
					</svg>
					Artists
				</Button>
				<Button variant="ghost" class="w-full justify-start">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="mr-2 h-4 w-4"
					>
						<path d="m16 6 4 14" />
						<path d="M12 6v14" />
						<path d="M8 8v12" />
						<path d="M4 4v16" />
					</svg>
					Albums
				</Button>
			</div>
		</div> -->
    <div class="py-2">
      <!-- <h2 class="relative px-7 text-lg font-semibold tracking-tight">Playlists</h2> -->
      <ScrollArea class="h-[300px] px-1">
        <div class="space-y-1 p-2">
          <!-- {#each playlists as playlist}
						<Button variant="ghost" class="w-full justify-start font-normal">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								class="mr-2 h-4 w-4"
							>
								<path d="M21 15V6" />
								<path d="M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
								<path d="M12 12H3" />
								<path d="M16 6H3" />
								<path d="M12 18H3" />
							</svg>
							{playlist}
						</Button>
					{/each} -->
        </div>
      </ScrollArea>
    </div>
  </div>
</div>
