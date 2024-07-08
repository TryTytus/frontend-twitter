<script lang="ts">
  import { slide } from "svelte/transition"
  import TreeNodeNav from "./tree-node-nav.svelte"

  export let node
  export let index
  export let depth = 0

  let showChildren = true
</script>

<div style="font-family: TwitterChirp;">
  <button
    class="flex items-center"
    on:click={() => {
      showChildren = !showChildren;
    }}
  >
    <div class="w-5 h-5" />
    <div
      style={depth === 0 ? "border: 0;" : ""}
      class="p-4 text-sm border-l border-gray-600"
    >
      <slot {node} />
      <TreeNodeNav {showChildren} commentsSize={node?.comments?.length} />
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
