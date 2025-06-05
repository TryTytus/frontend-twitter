<script lang="ts">
  import PostCard from "$lib/custom/blocs/post/post-card.svelte";
  import TextCard from "$lib/custom/blocs/text-card/text-card.svelte";
  import Post from "$lib/custom/blocs/post/post.svelte";
  import type { PageServerData } from "./$types";
  import { onMount } from "svelte";
  import Separator from "$lib/components/ui/separator/separator.svelte";
  import { PostViewModel } from "$lib/viewmodels/post-viewmodel";

  export let data: PageServerData;

  const postViewModel = new PostViewModel(data.token);
  const { posts, hasMorePosts, isLoading } = postViewModel;

  let isLoadingMore = false;

  async function handleLoadMore() {
    if (isLoadingMore || !$hasMorePosts) return;
    
    isLoadingMore = true;
    await postViewModel.loadMorePosts();
    isLoadingMore = false;
  }

  onMount(async () => {
    await postViewModel.loadInitialPosts();

    window.addEventListener('scroll', function() {
      if (window.scrollY >= document.documentElement.scrollHeight - window.innerHeight - 10) {
        handleLoadMore();
      }
    });
  });

  async function handleLike(postId: string) {
    await postViewModel.toggleLike(postId);
  }

  async function handleBookmark(postId: string) {
    await postViewModel.toggleBookmark(postId);
  }
</script>

<br />

<div class="m-auto">
  <main class="grid grid-cols-1 w-full lg:max-w-[70rem] -mt-4">
    {#if $posts && $posts.length > 0}
      {#each $posts as post}
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
          avatar={post.user.avatar}
          on:like={() => handleLike(post.id)}
          on:bookmark={() => handleBookmark(post.id)}
        />
      {/each}
    {/if}

    {#if $isLoading || isLoadingMore}
      <div class="text-center p-4">Loading...</div>
    {/if}
  </main>
</div>
