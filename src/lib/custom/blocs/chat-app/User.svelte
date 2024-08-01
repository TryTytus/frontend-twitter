<script>
  // @ts-nocheck
  import { createEventDispatcher } from "svelte";
  import StatusIcon from "./StatusIcon.svelte";
  import Button from "$lib/components/ui/button/button.svelte";

  export let user;
  export let selectedUser;

  const dispatch = createEventDispatcher();

  const onClick = () => {
    selectedUser = user;
    dispatch("SelectedUser");
  };

  const status = () => {
    return user.connected ? "online" : "offline";
  };
</script>

<div class="px-4 mt-2">
  <Button
    variant="ghost"
    class={`user rounded-lg p-8 w-full gap-2 flex justify-start ${selectedUser === user ? "bg-muted" : ""}`}
    on:click={onClick}
  >
    <img
      class="w-10 h-10 z-10 rounded-full"
      src="https://github.com/shadcn.png"
      alt=""
      srcset=""
    />
    <div class="description">
      <p class="text-lg">{user.username} {user.self ? " (yourself)" : ""}</p>
      <div>
        <StatusIcon connected={user.connected} />{status()}
      </div>
    </div>
    {#if user.hasNewMessages}
    <div class="flex w-full">
    <div class="grow"/>
      <div class="grow-0 w-2 h-2 rounded-full bg-blue-500"></div>
    </div>
    {/if}
  </Button>
</div>
