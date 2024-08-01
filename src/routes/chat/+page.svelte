<script>
  // @ts-nocheck

  import Chat from "$lib/custom/blocs/chat-app/Chat.svelte";
  import SelectUsername from "$lib/custom/blocs/chat-app/SelectUsername.svelte";

import { browser } from '$app/environment';

  
  import socket from "../../lib/custom/blocs/chat-app/socket";

  let usernameAlreadySelected = false;


let onUsernameSelection = (event) => {
    const { username } = event.detail;
    if (browser) {
    usernameAlreadySelected = true;
    socket.auth = { username };
    socket.connect();
    }
  };

  let created = () => {
    socket.on("connect_error", (err) => {
      if (err.message === "invalid username") {
        usernameAlreadySelected = false;
      }
    });
  };
  let destroyed = () => {
    socket.off("connect_error");
  };
</script>


{#if !usernameAlreadySelected}
  <SelectUsername on:SubmittedUsername={onUsernameSelection} />
{:else}
  <Chat />
{/if}

<style>
  body {
    margin: 0;
  }

  @font-face {
    font-family: Lato;
    src: "~/public/fonts/Lato-Regular.ttf";
  }

  #app {
    font-family: Lato, Arial, sans-serif;
    font-size: 14px;
  }
</style>
