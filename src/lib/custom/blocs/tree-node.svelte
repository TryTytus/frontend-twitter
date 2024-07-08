<script>
  import { MessageCircle, Heart, CircleMinus, CirclePlus } from "lucide-svelte";
  import { slide } from "svelte/transition";
  export let node;
  export let index;
  export let depth = 0;

  let showChildren = true;
</script>

<div style="font-family: TwitterChirp;" class="node">
  <button
    class="flex items-center cursor-pointer"
    on:click={() => {
      showChildren = !showChildren;
    }}
  >
    {#if node.comments}
      <div
        class="w-5 h-5"
      >
      </div>
    {:else}
      <div class="w-5 h-5" />
    {/if}
    <div
      style={depth === 0 ? "border: 0;" : ""}
      class="p-4 text-sm border-l border-gray-600"
    >
      <slot {node} />
      <div class="flex -mx-[0.2rem] mt-3 gap-2 text-xs items-center">
        {#if node.comments.length}
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
    </div>
  </button>
  {#if node.comments && showChildren}
    <div
      style={depth === 0 ? "border: 0;" : ""}
      class="ml-5 border-l border-gray-600"
      transition:slide|local
    >
      {#each node.comments as _node, i}
        <svelte:self node={_node} index={i} depth={depth + 1} let:node>
          <slot {node} />
        </svelte:self>
      {/each}
    </div>
  {/if}
</div>
