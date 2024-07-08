<script lang="ts">
    import TreeNode from "./tree-node.svelte"
    export let tree: any[] = []
    
    import { ArrowLeft, MessageCircle, Bookmark, Download, Heart, Repeat, CircleMinus } from "lucide-svelte";

  </script>
  
  {#each tree as _node, i}
    <TreeNode node={_node} index={i} let:node>
      <slot {node}>
        <div class="name">{node.name}</div>
        
        
      </slot>

    </TreeNode>
  {/each}

