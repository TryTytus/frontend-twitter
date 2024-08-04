<script lang="ts">
  import {
    MessageCircle,
    Bookmark,
    Download,
    Heart,
    Repeat,
    BarChart2,
  } from "lucide-svelte";

  export let isLiked = false;
  export let likesCount = 0;
  export let commentsCount = 0;
  export let viewsCount = 0;
  export let id = 3;

  export let isBookmarked = false;

  async function handleLike() {
    if (!isLiked) {
      isLiked = true;
      likesCount++;
      await fetch(`http://localhost:3000/post-likes/like/${id}`, {
        method: 'POST'
      })
    } else {
      isLiked = false;
      likesCount--;
      await fetch(`http://localhost:3000/post-likes/dislike/${id}`, {
        method: 'POST'
      });
    }
  }

  async function handleBookmark() {
    await fetch(`http://localhost:3000/bookmark/${id}`, {
      method: !isBookmarked ? "POST" : "DELETE",
    });
    isBookmarked = !isBookmarked;
  }
</script>

<nav
  class="flex justify-between border-y border-gray-600 my-2 mx-2 lg:mx-6 px-6 py-3"
>
<div class="flex items-center gap-2 hover:text-blue-400">
    <MessageCircle />
    {commentsCount}
</div>
  <div class="flex items-center gap-2 hover:text-green-400">
    <Repeat class="" />
    0
  </div>
  <button
    on:click={handleLike}
    class={`flex items-center gap-2 ${isLiked ? "text-pink-500" : "hover:text-pink-500"}`}
  >
    <Heart class={`w-4 ${isLiked ? "fill-pink-500" : ""}`} />
    {likesCount}
  </button>
  <div class="flex items-center gap-2 hover:text-blue-400">
    <BarChart2 />
    {viewsCount}
  </div>
<button on:click={handleBookmark}>
    <Bookmark class={`hover:stroke-blue-400 ${isBookmarked ? 'fill-blue-400 text-blue-400' : ''}`} />
</button>

</nav>
