<script lang="ts">
  import * as Avatar from "$lib/components/ui/avatar/index";

  import PostNav from "./post-nav.svelte";
  import PostHeader from "./post-header.svelte";
  import moment from 'moment';
  import { onMount } from "svelte";


  export let id = 3;
  export let author = "Elon Musk";
  export let nickname = "elonmusk";
  export let content = `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Adipisci pariatur
  veniam molestiae repellat totam assumenda, explicabo voluptatem cumque
  suscipit eveniet praesentium aut? Natus voluptates dolorem vel odit obcaecati
  eos esse! Nisi dolorum, in dolore totam inventore sint praesentium quod
  laudantium quisquam laborum suscipit animi quo debitis, sed placeat nulla,
  necessitatibus ab obcaecati neque reprehenderit quis velit reiciendis iure
  non. Placeat? Iusto libero aliquam hic rerum explicabo cupiditate ea,
  laboriosam saepe consectetur temporibus aut, iste aperiam sunt, aliquid ipsam
  quasi? Facere doloremque obcaecati sunt architecto nobis fugiat saepe magni,
  amet harum.`;

  export let viewsCount = 118;

  export let isLiked = false;
  export let likesCount = 0;
  export let commentsCount = 0;
  export let isBookmarked = 0;
  export let createdAt: any;

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
        {author}
      </h1>
      <h2 class="text-sm text-muted-foreground">
        @{nickname}
      </h2>
    </div>
  </div>
</div>

<h2 style="font-family: TwitterChirp;" class="mx-2 lg:mx-16 my-2 text-lg">
  {content}
</h2>

<div class="flex text-sm mx-2 lg:mx-6 text-muted-foreground">
  <p>{moment(createdAt).format('DD MMMM YYYY · h:mm A')} ·</p>
  <p class="text-white">&nbsp;{viewsCount}&nbsp;</p>
  <p>Views</p>
</div>

<PostNav {id} {isLiked} {likesCount} {commentsCount} {viewsCount} {isBookmarked} />
