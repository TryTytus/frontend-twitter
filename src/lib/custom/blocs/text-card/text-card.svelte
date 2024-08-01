<script lang="ts">
  import * as Avatar from "$lib/components/ui/avatar/index.js";
  import * as Card from "$lib/components/ui/card/index.js";
  import { Footer } from "$lib/components/ui/sheet";
  import {
    BarChart2,
    Bookmark,
    Download,
    Heart,
    MessageCircle,
    Repeat,
  } from "lucide-svelte";

  export let id = "3";
  export let author = "Elon Musk";
  let avatar = "/morty.jpeg";
  export let nickname = "elonmusk";
  export let content = `
  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Adipisci
        pariatur veniam molestiae repellat totam assumenda, explicabo voluptatem
        cumque suscipit eveniet praesentium aut? Natus voluptates dolorem vel
        odit obcaecati eos esse! Nisi dolorum, in dolore totam inventore sint
        praesentium quod laudantium quisquam laborum suscipit animi quo debitis,
        sed placeat nulla, necessitatibus ab obcaecati neque reprehenderit quis
        velit reiciendis iure non. Placeat? Iusto libero aliquam hic rerum
        explicabo cupiditate ea, laboriosam saepe consectetur temporibus aut,
        iste aperiam sunt, aliquid ipsam quasi? Facere doloremque obcaecati sunt
        architecto nobis fugiat saepe magni, amet harum.
  `;
  export let isLiked = false;
  export let likesCount = 0;


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

<a data-sveltekit-preload-data="off" href={`/status/${id}`} class="w-full px-4">
  <Card.Root class=" border-t-0 lg:w-[600px] rounded-none">
    <Card.Header class="pb-1">
      <div class="flex items-center gap-3">
        <Avatar.Root>
          <Avatar.Image class="z-0" src="/morty.jpeg" alt="@shadcn" />
          <Avatar.Fallback>CNN</Avatar.Fallback>
        </Avatar.Root>
        <div>
          <Card.Title>{author}</Card.Title>

          <Card.Description>@{nickname}</Card.Description>
        </div>
      </div>
    </Card.Header>
    <Card.Content class="px-6 py-2">
      <h2 style="font-family: TwitterChirp;" class="text-base pl-14">
        {content}
      </h2>
    </Card.Content>
    <Card.Footer
      class="flex mx-4 justify-between pb-4 text-xs text-muted-foreground"
    >
      <div class="flex items-center gap-2 hover:text-blue-400">
        <MessageCircle class="w-4" />
        0
      </div>
      <div class="flex items-center gap-2 hover:text-green-400">
        <Repeat class=" w-4" />
        0
      </div>
      <button on:click={handleLike}
        class={`flex items-center gap-2 ${isLiked ? "text-pink-500" : "hover:text-pink-500"}`}
      >
        <Heart class={`w-4 ${isLiked ? "fill-pink-500" : ""}`} />
        {likesCount}
    </button>
      <div class="flex items-center gap-2 hover:text-blue-400">
        <BarChart2 class="w-4" />
        0
      </div>
      <div class="flex items-center gap-4">
        <Bookmark class=" w-4 hover:text-blue-400" />
        <Download class=" w-4 hover:text-blue-400" />
      </div>
    </Card.Footer>
  </Card.Root>
</a>
