<script lang="ts">
  import * as Avatar from "$lib/components/ui/avatar/index";

  import PostNav from "./post-nav.svelte";
  import PostHeader from "./post-header.svelte";
</script>

<PostHeader />

<div class=" px-3 lg:px-16 py-2">
  <div class="flex z-0 items-center gap-3">
    <Avatar.Root>
      <Avatar.Image
        class="avatar"
        src="https://github.com/shadcn.png"
        alt="@shadcn"
      />
      <Avatar.Fallback>CNN</Avatar.Fallback>
    </Avatar.Root>
    <div>
      <h1 class="text-lg font-semibold leading-none tracking-tight">
        Elon Musk
      </h1>

      <h2 class="text-sm text-muted-foreground">@elonmusk</h2>
    </div>
  </div>
</div>

<h2 style="font-family: TwitterChirp;" class="mx-2 lg:mx-16 my-2 text-lg">
  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Adipisci pariatur
  veniam molestiae repellat totam assumenda, explicabo voluptatem cumque
  suscipit eveniet praesentium aut? Natus voluptates dolorem vel odit obcaecati
  eos esse! Nisi dolorum, in dolore totam inventore sint praesentium quod
  laudantium quisquam laborum suscipit animi quo debitis, sed placeat nulla,
  necessitatibus ab obcaecati neque reprehenderit quis velit reiciendis iure
  non. Placeat? Iusto libero aliquam hic rerum explicabo cupiditate ea,
  laboriosam saepe consectetur temporibus aut, iste aperiam sunt, aliquid ipsam
  quasi? Facere doloremque obcaecati sunt architecto nobis fugiat saepe magni,
  amet harum.
</h2>

<div class="flex text-sm mx-2 lg:mx-6 text-muted-foreground">
  <p>5:04 AM · Jul 8, 2024 ·</p>
  <p class="text-white">&nbsp;118K&nbsp;</p>
  <p>Views</p>
</div>

<PostNav />
