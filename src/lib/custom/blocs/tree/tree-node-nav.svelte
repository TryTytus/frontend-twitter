<script lang="ts">
  import { MessageCircle, Heart, CircleMinus, CirclePlus } from "lucide-svelte";
  export let commentsSize = 0;
  export let showChildren = true;
</script>

<div class="flex -mx-[0.2rem] mt-3 gap-2 text-xs items-center">
  {#if commentsSize > 0}
    {#if showChildren}
      <CircleMinus class="w-4" />
    {:else}
      <CirclePlus class="w-4" />
    {/if}
    ·
  {/if}

  <Heart class="w-4" />
  2.3 K likes
  <div class="w-2" />
  <MessageCircle class="w-4" />
  Replay
  
</div>
