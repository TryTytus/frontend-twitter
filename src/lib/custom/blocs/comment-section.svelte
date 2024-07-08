<script lang="ts">
      import * as Avatar from "$lib/components/ui/avatar/index.js"

      export let node
</script>

<div class="flex gap-3">
  <Avatar.Root style="width: 2rem; height: 2rem;">
    <Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
    <Avatar.Fallback>CNN</Avatar.Fallback>
  </Avatar.Root>
  <h1 class="  pt-1 font-bold leading-none tracking-tight">Elon Musk</h1>
</div>
<div class="px-12 text-sm">
  {node.id}
  {node.content}
</div>
