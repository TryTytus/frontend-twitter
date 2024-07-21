<script lang="ts">
  import { Button, buttonVariants } from "$lib/components/ui/button/index.js";
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
  import { Textarea } from "$lib/components/ui/textarea/index.js";
  import { Bird } from "lucide-svelte";
  import * as Session from "supertokens-auth-react/recipe/session";
  import { toast } from "svelte-sonner";

  let content = "";

  let dialogOpen = false;

  let submitForm = async () => {
    const response = await fetch("http://localhost:3000/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await Session.getAccessToken()}`,
      },
      body: JSON.stringify({ content }),
    });

    console.log(await response.json());

    dialogSwitch();
    toast("Tweet created");
  };

  let dialogSwitch = () => (dialogOpen = !dialogOpen);
</script>

<Dialog.Root bind:open={dialogOpen}>
  <slot />

  <Dialog.Content class="sm:max-w-[425px]">
    <Dialog.Header>
      <Dialog.Title>Send Tweet</Dialog.Title>
      <!-- <Dialog.Description>
          
        </Dialog.Description> -->
    </Dialog.Header>
    <div class="grid gap-4 py-4">
      <div class="grid w-full gap-1.5">
        <Label for="message">Max length: 280</Label>
        <Textarea
          bind:value={content}
          class="max-h-44"
          maxlength={280}
          placeholder="Type your message here."
          id="message"
        />
      </div>

      <!-- <FileUpload /> -->
    </div>
    <Dialog.Footer>
      <Button on:click={submitForm} class="gap-2" type="submit">
        <Bird class="w-4" />
        Tweet
      </Button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>
