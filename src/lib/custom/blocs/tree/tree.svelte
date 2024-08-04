<script lang="ts">
    import TreeNode from "./tree-node.svelte"
    export let tree: any[] = []

    export let likes: string[] = []

  </script>
  
  {#each tree as _node, i}
    <TreeNode {likes} path={ i + '.comments'} node={_node} index={i} let:node>
      <slot {node}>
        <div class="name">{node.name}</div>
        
        
      </slot>

    </TreeNode>
  {/each}

