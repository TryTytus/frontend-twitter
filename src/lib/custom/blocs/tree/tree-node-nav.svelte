<script lang="ts">
  import { MessageCircle, Heart, CircleMinus, CirclePlus } from "lucide-svelte";
  import { page } from "$app/stores";
  import { commentLikes } from "$lib/stores/commentLikes";

  export let commentsSize = 0;
  export let showChildren = true;
  export let replyBox = false;
  export let likesCount = 0;
  let likes = new Set<string>();
  export let _id: string;

  export let path: string;

  commentLikes.subscribe((x) => (likes = x));

  let handleLike = async () => {
    replyBox = false;
    const type = isLiked ? "dislike" : "like";
    const res = await fetch(
      `http://localhost:3000/comment/${type}?path=${path}&postId=${$page.params.id}`,
      {
        method: "POST",
      }
    ).then((res) => res.json());
    likes.delete(_id);
    commentLikes.set(likes);
    isLiked ? likesCount-- : likesCount++;
    isLiked = !isLiked;
    
  };

  let isLiked = likes.has(_id);
</script>

<div class="flex -mx-[0.2rem] mt-3 gap-2 text-xs items-center">
  <button on:click={() => (showChildren = !showChildren)}>
    {#if commentsSize > 0}
      {#if showChildren}
        <CircleMinus class="w-4" />
      {:else}
        <CirclePlus class="w-4" />
      {/if}
    {/if}
  </button>
  {#if commentsSize > 0}
    ·
  {/if}
  <button on:click={handleLike} class={`flex items-center gap-2 `}>
    <Heart class={`w-4 ${isLiked ? "text-pink-600 fill-pink-600" : ""}`} />
    {likesCount} likes
  </button>

  <div class="w-2" />

  <button
    on:click={() => (replyBox = !replyBox)}
    class="flex items-center gap-2"
  >
    <MessageCircle class="w-4" />
    Replay
  </button>
</div>
