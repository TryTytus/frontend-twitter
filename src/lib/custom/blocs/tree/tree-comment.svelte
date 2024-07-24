<script lang="ts">
  import Button from "$lib/components/ui/button/button.svelte";
  import Textarea from "$lib/components/ui/textarea/textarea.svelte";
  import { page } from "$app/stores";


  export let replyBox = true;
  export let path: string;

  let value: string;

  type handleType = (value: string) => void;

  export let handle: handleType

  let sendComment = async () => {
    replyBox = false
    const res = await fetch(
      `http://localhost:3000/comment?path=${path}&postId=${$page.params.id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          content: value,
          name: "jas",
        }),
      }
    ).then(res => res.json())

    handle(value)

    console.log(await res);
  };
</script>

<!-- <div class="h-28 w-80 border rounded-2xl">


</div> -->
{#if replyBox}
  <div class="ml-2 mt-2 w-80">
    <Textarea bind:value class="h-24 max-h-40 rounded-3xl" />
    <div class="w-80 px-2 pt-3 grid grid-cols-2 gap-4">
      <Button on:click={sendComment} class="rounded-full h-8 w-36">Comment</Button>
      <Button on:click={() => replyBox = false} class="rounded-full h-8 w-36" variant="secondary">Cancel</Button>
    </div>
  </div>
{/if}
