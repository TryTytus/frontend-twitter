<script lang="ts">
  import { CircleUser } from "lucide-svelte";
  import TextCard from "$lib/custom/blocs/text-card/text-card.svelte";
  import ProfileUpdateDialog from "$lib/custom/blocs/profile-update-dialog/profile-update-dialog.svelte";
  import { buttonVariants } from "$lib/components/ui/button";
  import * as Dialog from "$lib/components/ui/dialog/index.js";

  import type { PageServerData } from './$types';

  export let data: PageServerData;

</script>

<div class="grid w-full border-x">
  <div class="w-full h-52 bg-muted rounded-b-xl">
    <CircleUser class="w-36  h-36 mt-36 ml-10 bg-gray-500 rounded-full" />
  </div>

  <div class="mt-[5.4rem] ml-16">
    <h1 class=" text-3xl font-semibold tracking-tight transition-colors">
      {data?.user?.name}
    </h1>
    <h2 class="text-muted-foreground">@{data?.user?.nickname}</h2>

    <p class="mt-2 mb-4">
      {data?.user?.description ?? "Add amazing bio ...🍃"}
    </p>

    <ProfileUpdateDialog>
      <Dialog.Trigger class={buttonVariants({ variant: "outline" })}
        >Edit Profile</Dialog.Trigger
      >
    </ProfileUpdateDialog>
  </div>

  <div class="border-t mt-10 w-full">
    <div class="mx-auto inline-block flex flex-col gap-4">
      {#each data?.posts as post}
        <TextCard 
        nickname={post.user.nickname}
        author={post.user.name}
        content={post.content}
        id={post.id}
        likesCount={post.likesCount}
        isLiked={post.isLiked}
        commentsCount={post.commentsCount}
        viewsCount={post.viewsCont}
        isBookmarked={post.isBookmarked}
        createdAt={post.createdAt}
        
        
        profile={true} />
      {/each}
    </div>
  </div>
</div>
