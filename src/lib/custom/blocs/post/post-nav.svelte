<script lang="ts">
  import {
    MessageCircle,
    Bookmark,
    Download,
    Heart,
    Repeat,
  } from "lucide-svelte";

  export let isLiked = false;
  export let likesCount = 0;
  export let id = 3;

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
</script>

<nav
  class="flex justify-between border-y border-gray-600 my-2 mx-2 lg:mx-6 px-6 py-3"
>
  <MessageCircle class="hover:stroke-blue-400" />
  <Repeat class="hover:stroke-green-400" />
  <button
    on:click={handleLike}
    class={`flex items-center gap-2 ${isLiked ? "text-pink-500" : "hover:text-pink-500"}`}
  >
    <Heart class={`w-4 ${isLiked ? "fill-pink-500" : ""}`} />
    {likesCount}
  </button>
  <Bookmark class="hover:stroke-blue-400" />
  <Download class="hover:stroke-blue-400" />
</nav>
