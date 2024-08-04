<script lang="ts">
  // @ts-nocheck

  import Chat from "$lib/custom/blocs/chat-app/Chat.svelte";
  import SelectUsername from "$lib/custom/blocs/chat-app/SelectUsername.svelte";

  import { browser } from "$app/environment";

  import { onMount } from "svelte";

  import { io } from "socket.io-client";

  import Session from "supertokens-auth-react/recipe/session";

  async function getJWT() {
    if (await Session.doesSessionExist()) {
      let userId = await Session.getUserId();
      return await Session.getAccessToken();
    }
    return { empty: "obj" };
  }

  export let socket: any = null;

  const URL = "http://localhost:3000";

  let usernameAlreadySelected = false;

  let globalUsername = "pipka";

  let onUsernameSelection = (event) => {
    const { nickname } = event.detail;
    globalUsername = nickname;
    if (browser) {
      usernameAlreadySelected = true;
      socket.auth = { username: nickname };
      socket.connect();
    }
  };

  let selectUsername = (username, nickname) => {
    if (browser) {
      usernameAlreadySelected = true;
      globalUsername = nickname;

      socket.auth = { username: nickname };
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

  onMount(async () => {
    socket = io(URL, {
      autoConnect: false,
      query: {
        token: await getJWT(),
      },
    });

    socket.onAny((event, ...args) => {
      console.log(event, args);
    });

    const username = sessionStorage.getItem("username");
    const nickname = sessionStorage.getItem("nickname");
    selectUsername(username, nickname);
  });
</script>

{#if !usernameAlreadySelected}
  <SelectUsername on:SubmittedUsername={onUsernameSelection} />
{:else}
  <Chat bind:socket username={globalUsername} />
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
