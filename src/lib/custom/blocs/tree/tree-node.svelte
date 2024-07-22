<script lang="ts">
  import { slide } from "svelte/transition";
  import TreeNodeNav from "./tree-node-nav.svelte";
  import TreeComment from "./tree-comment.svelte";

  export let node;
  export let index;
  export let depth = 0;
  export let path: string;

  let showChildren = true;
  let replyBox = false;

  let replayBoxSwitch = () => (replyBox = !replyBox);
</script>

<div style="font-family: TwitterChirp;">
  <div class="flex items-center text-left">
    <div class="w-5 h-5" />
    <div
      style={depth === 0 ? "border: 0;" : ""}
      class="p-4 text-sm border-l border-gray-600"
    >
      <!-- {path} -->
      <slot {node} />
      <TreeNodeNav
        bind:replyBox
        bind:showChildren
        commentsSize={node?.comments?.length}
      />
      <TreeComment {path} {replyBox} />
    </div>
  </div>
  {#if node.comments && showChildren}
    <div
      style={depth === 0 ? "border: 0;" : ""}
      class="ml-5 border-l border-gray-600"
      transition:slide|local
    >
      {#each node.comments as _node, i}
        <svelte:self
          path={path + "." + i + ".comments"}
          node={_node}
          index={i}
          depth={depth + 1}
          let:node
        >
          <slot {node} />
        </svelte:self>
      {/each}
    </div>
  {/if}
</div>
