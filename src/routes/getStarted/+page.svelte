<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
  import * as Card from "$lib/components/ui/card/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
  import { getContext } from "svelte";

  import * as Session from "supertokens-auth-react/recipe/session";

  import { onMount } from "svelte";
  import { goto } from "$app/navigation";

  let userIdValue: string | null = null;

  //   userId.subscribe((val) => (userIdValue = val));

  // export let userId = getContext('userId');

  let session = false;
  let userId: string | null = null;
  let user: any;

  onMount(async () => {
    session = await Session.doesSessionExist();
    if (session) {
      userId = await Session.getUserId();
      // setContext("userId", null);
      user = await fetch(`http://localhost:3000/user/${userId}`)
        .then((res) => res.json())
        .catch((e) => console.error(e));

      if (user !== undefined) goto("/");
    } else goto("/auth");
  });

  let name = "";
  let nickname = "";

  let submitForm = async () => {
    if (userId !== null)
      await fetch("http://localhost:3000/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: userId, name, nickname }),
      });
  };
</script>

<main
  class="fixed top-0 left-0 z-50 w-full bg-black h-full grid place-content-center"
>
  <Card.Root class="mx-auto max-w-sm">
    <Card.Header>
      <Card.Title class="text-xl">Get started</Card.Title>
      <Card.Description
        >Enter your information to create an account</Card.Description
      >
    </Card.Header>
    <Card.Content>
      <div class="grid gap-4">
        <div class="grid gap-2">
          <Label for="name">Name</Label>
          <Input
            bind:value={name}
            id="name"
            type="text"
            placeholder="Full name"
            required
          />
        </div>
        <div class="grid gap-2">
          <Label for="nickname">Nickname</Label>
          <Input
            bind:value={nickname}
            id="nickname"
            type="text"
            placeholder="my_cool_nickname"
          />
        </div>
        <Button on:click={submitForm} type="submit" class="w-full"
          >Continue</Button
        >
      </div>
    </Card.Content>
  </Card.Root>
</main>
