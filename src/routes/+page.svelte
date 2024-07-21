<script lang="ts">
  import PostCard from "$lib/custom/blocs/post/post-card.svelte";
  import TextCard from "$lib/custom/blocs/text-card/text-card.svelte";

  import Post from "$lib/custom/blocs/post/post.svelte";

  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<br />

<div class="m-auto">
  <main class="grid grid-cols-1 w-full lg:max-w-[70rem] -mt-4">
    {#each data.posts as post}
      <!-- {JSON.stringify(post)} -->
      <TextCard
        nickname={post.user.nickname}
        author={post.user.name}
        content={post.content}
      />
    {/each}

    <!-- <PostCard />
    <PostCard />
    <PostCard />
    <PostCard /> -->
  </main>
</div>
