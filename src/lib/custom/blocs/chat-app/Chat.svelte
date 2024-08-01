<script>
  // @ts-nocheck

  import { onMount, onDestroy } from "svelte";
  import socket from "./socket";
  import User from "./User.svelte";

  import MessagePanel from "./MessagePanel.svelte";

  export let selectedUser = null;
  let users = [];

  export let content = "";

  const onMessage = () => {
    if (selectedUser) {
      socket.emit("private message", {
        content,
        to: selectedUser.userID,
      });
      selectedUser.messages = [
        ...selectedUser.messages,
        {
          content,
          fromSelf: true,
        },
      ];
      content = "";
    }
  };

  const onSelectUser = () => {
    user.hasNewMessages = false;
  };

  const initReactiveProperties = (user) => {
    user.connected = true;
    user.messages = [];
    user.hasNewMessages = false;
  };

  onMount(() => {
    socket.on("connect", () => {
      users.forEach((user) => {
        if (user.self) {
          user.connected = true;
        }
      });
    });

    socket.on("disconnect", () => {
      users.forEach((user) => {
        if (user.self) {
          user.connected = false;
        }
      });
    });

    socket.on("users", (usersList) => {
      usersList.forEach((user) => {
        user.self = user.userID === socket.id;
        initReactiveProperties(user);
      });
      users = usersList.sort((a, b) => {
        if (a.self) return -1;
        if (b.self) return 1;
        if (a.username < b.username) return -1;
        return a.username > b.username ? 1 : 0;
      });
    });

    socket.on("user connected", (user) => {
      initReactiveProperties(user);
      users = [...users, user];
    });

    socket.on("user disconnected", (id) => {
      users = users.map((user) => {
        if (user.userID === id) {
          user.connected = false;
        }
        return user;
      });
    });

    socket.on("private message", ({ content, from }) => {
      users = users.map((user) => {
        if (user.userID === from) {
          user.messages.push({
            content,
            fromSelf: false,
          });
          if (user !== selectedUser) {
            user.hasNewMessages = true;
          }
        }
        return user;
      });
    });
  });

  onDestroy(() => {
    socket.off("connect");
    socket.off("disconnect");
    socket.off("users");
    socket.off("user connected");
    socket.off("user disconnected");
    socket.off("private message");
  });
</script>


  <div class="left-panel w-full  lg:w-4/5 z-50 gird grid-cols-3 h-screen border-l border-muted">
    <div class="col-span-1 h-screen flex flex-col">
    {#each users as user (user.userID)}
      <User selected={user == !null} {user} bind:selectedUser />
    {/each}
    </div>

  <div class="col-span-2">

    {#if selectedUser}
    <MessagePanel on:message={onMessage} bind:content user={selectedUser} />
  {/if}
</div>
  </div>


<style>
  .left-panel {
    display: grid;

    position: fixed;
    right: 0;
    top: 0;
    bottom: 0;
    overflow-x: hidden;
    color: white;
  }


</style>
