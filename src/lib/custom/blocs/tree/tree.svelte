<script lang="ts">
    import TreeNode from "./tree-node.svelte"
    export let tree: any[] = []

  </script>
  
  {#each tree as _node, i}
    <TreeNode path={'comments'} node={_node} index={i} let:node>
      <slot {node}>
        <div class="name">{node.name}</div>
        
        
      </slot>

    </TreeNode>
  {/each}

