<script lang="ts">
  import { MessageCircle, Heart, CircleMinus, CirclePlus } from "lucide-svelte";
  export let commentsSize = 0;
  export let showChildren = true;
  export let replyBox = false;
</script>

<div class="flex -mx-[0.2rem] mt-3 gap-2 text-xs items-center">
  <button on:click={() => (showChildren = !showChildren)}>
    {#if commentsSize > 0}
      {#if showChildren}
        <CircleMinus class="w-4" />
      {:else}
        <CirclePlus class="w-4" />
      {/if}
    {/if}
  </button>
  {#if commentsSize > 0}
  ·
  {/if}
  <div class="flex items-center gap-2">
    <Heart class="w-4" />
    0 likes
  </div>

  <div class="w-2" />

  <button
    on:click={() => (replyBox = !replyBox)}
    class="flex items-center gap-2"
  >
    <MessageCircle class="w-4" />
    Replay
  </button>
</div>
