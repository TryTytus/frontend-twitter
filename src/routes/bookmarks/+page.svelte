<script lang="ts">
    import PostCard from "$lib/custom/blocs/post/post-card.svelte";
    import TextCard from "$lib/custom/blocs/text-card/text-card.svelte";
  
    import Post from "$lib/custom/blocs/post/post.svelte";
  
    import type { PageServerData } from "./$types";
    import { onMount } from "svelte";
  import { Separator } from "$lib/components/ui/separator";
  
    export let data: PageServerData;
  
    let listElement:any;
  
    let skip = 15
  
    async function loadMore() {
      const newPosts = await fetch(`http://localhost:3000/bookmark?skip=${skip}`).then((res) => res.json());
      data.posts = [...data.posts, ...newPosts];
      skip += 15
    }
  
  
    onMount(() => {
      window.addEventListener('scroll', function() {
    // 10 = desired pixel distance from the bottom of the page while scrolling
    if (window.scrollY >= document.documentElement.scrollHeight - window.innerHeight) {
      loadMore()
    }
  });
    })
  
  </script>
  
  <br />
  
  <div class="m-auto">
    <main class="grid grid-cols-1 w-full lg:max-w-[70rem] -mt-4">
      {#if data.posts}
      <Separator class="mx-4 lg:w-[600px]" />
      {#each data.posts as post}
        <!-- {JSON.stringify(post)} -->
        <TextCard
          id={post.id}
          nickname={post.user.nickname}
          author={post.user.name}
          content={post.content}
          isLiked={post.isLiked}
          likesCount={post.likesCount}
          commentsCount={post.commentsCount}
          viewsCount={post.viewsCont}
          isBookmarked={post.isBookmarked}
        />
      {/each}
  
      {/if}
      <!-- <PostCard />
      <PostCard />
      <PostCard />
      <PostCard /> -->
    </main>
  </div>
  