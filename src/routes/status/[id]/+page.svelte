<script lang="ts">
  // @ts-nocheck
  import Tree from "$lib/custom/blocs/tree/tree.svelte";
  import CommentSection from "$lib/custom/blocs/comment-section.svelte";
  import Post from "$lib/custom/blocs/post/post.svelte";
  import type { PageData } from "../$types";
  import { Textarea } from "$lib/components/ui/textarea";
  import { CircleUser } from "lucide-svelte";
  import Button from "$lib/components/ui/button/button.svelte";
  import { page } from "$app/stores";

  import { username } from "$lib/stores/username";
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  import { commentLikes } from "$lib/stores/commentLikes";
  import { CommentViewModel } from "$lib/viewmodels/comment-viewmodel";
  import { CommentRepository } from "$lib/models/comment_repository";


  import { comments } from "$lib/stores/commnets";

  export let data: PageData;


  comments.set(data?.comments || []);

  let commentViewModel = new CommentViewModel(data?.post?.id);

  console.log(data.likes.map(like => like.commentInfoId.trim()))

  commentLikes.set(new Set(data.likes.map(like => like.commentInfoId.trim())))


  let onReply = async () => {
    await CommentRepository.addTopComment($page.params.id, value);
    value = "";

    comments.set(await CommentRepository.getCommentsByPostId($page.params.id));
  };

  let value = "";

  let open = false;
  let myElement: HTMLElement;

  const handleClick = (event: any) => {
    if (myElement && !myElement.contains(event.target)) {
      // myElement.style.display = 'none';
      open = false;
    } else open = true;
  };

  const preventPropagation = (event: any) => {
    event.stopPropagation();
  };



  onMount(async () => {
    commentViewModel.setComments(comments);

    username.set(await sessionStorage.getItem('username'))


    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  });
</script>

<main class="border-gray-700 w-full border-x min-h-[100vh]">
  <Post
    id={data?.post?.id}
    author={data?.post?.user?.name}
    nickname={data?.post?.user?.nickname}
    content={data?.post?.content}
    likesCount={data?.post?.likesCount}
    isLiked={data?.post?.isLiked}
    commentsCount={data?.post?.commentsCount}
    viewsCount={data?.post?.viewsCont}
    isBookmarked={data?.post?.isBookmarked}
    createdAt={data?.post?.createdAt}
    avatar={data?.post?.user?.avatar}
  />

  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div
    bind:this={myElement}
    on:click={handleClick}
    class="flex gap-1 px-7 pt-4 pb-1"
  >
    <CircleUser class="stroke-slate-300 bg-gray-700 rounded-full w-8 h-8 "
    ></CircleUser>
    <Textarea
      bind:value
      placeholder="Post your reply"
      class=" focus-visible:ring-0 border-0 h-10 min-h-8 "
    ></Textarea>
  </div>
  <div class="border-b border-gray-600 px-16 pb-3 flex">
    {#if open}
      <Button on:click={onReply} class="rounded-full">Reply</Button>
    {/if}
  </div>

  <div class="mb-6">
    <Tree tree={$comments} let:node>
      <CommentSection {node} />
    </Tree>
  </div>
</main>
