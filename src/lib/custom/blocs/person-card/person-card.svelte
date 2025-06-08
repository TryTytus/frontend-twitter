<script lang="ts">
  import { goto } from "$app/navigation";
  import * as Avatar from "$lib/components/ui/avatar/index.js";

  export let id: string;
  export let name = "Adam Tyton";
  export let nickname = "@trytytus";
  export let avatar = "";
</script>

<button on:click={() => goto(`/user/${nickname}`)} class=" flex gap-4">
  <div>
    <Avatar.Root>
      <Avatar.Image class="z-0" src={avatar} alt="@shadcn" />
      <Avatar.Fallback>CNN</Avatar.Fallback>
    </Avatar.Root>
  </div>
  <div class="text-left">
    <h1 class="text-md font-semibold tracking-tight">{name}</h1>
    <h2 class="text-sm text-muted-foreground font-semibold">{nickname}</h2>
  </div>
</button>
