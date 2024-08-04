<script lang="ts">
  // @ts-nocheck

  import { onMount, onDestroy } from "svelte";
  import User from "./User.svelte";

  import MessagePanel from "./MessagePanel.svelte";

  export let socket: any = null;

  export let selectedUser = null;
  let users:any = [];

  $: myUsers = users;

  export let username: string;

  export let content = "";

  const onMessage = () => {
    if (selectedUser) {

      const mes = {
        content,
        to: selectedUser.userID,
        senderUsername: username,
      }
      console.log(mes)

      socket.emit("private message", mes);
      selectedUser = {
        ...selectedUser,
        messages: [
          ...selectedUser.messages,
          {
            content,
            fromSelf: true,
          },
        ],
      };
      users = users.map((user) =>
        user.userID === selectedUser.userID ? selectedUser : user
      );
      content = "";
    }
  };

  const onSelectUser = (user) => {
    selectedUser = user;
    user.hasNewMessages = false;
  };

  function userChanged(user) {
    if (selectedUser.username === user.username)
      selectedUser = user
  }

  const initReactiveProperties = (user) => {
    if (user.messages === undefined ) user.messages = [];
    user.hasNewMessages = false;
  };

  onMount(() => {
    socket.on("connect", () => {
      users.forEach((user) => {
        if (user.self) {
          return { ...user, connected: true };
        }
        return user;
      });
    });

    socket.on("disconnect", () => {
      users.forEach((user) => {
        if (user.self) {
          return { ...user, connected: false };
        }
        return user;
      });
    });

    socket.on("users", (usersList) => {
      users = usersList
        .map((user) => {
          user.self = user.userID === socket.id;

          initReactiveProperties(user);
          return user;
        })
        .sort((a, b) => {
          if (a.self) return -1;
          if (b.self) return 1;
          if (a.username < b.username) return -1;
          return a.username > b.username ? 1 : 0;
        });
    });

    socket.on("user connected", (user) => {
      initReactiveProperties(user);
      users = users.map((u) => {
        if (u.username === user.username) {
          const newUser = { ...user, connected: true }
          userChanged(newUser)
        return newUser;
        }
        return u;
      });
    });

    socket.on("user disconnected", (username) => {
      users = users.map((user) =>{
        const newUser = user.userID === username ? { ...user, connected: false } : user
        if (user.username === selectedUser.username)
          selectedUser = user
        return user
      }
      ); 
    });

    socket.on("private message", ({ content, from, senderUsername }) => {
      // users = users.map((user) => {
      //   console.log(content);
      //   if (user.username === senderUsername) {
      //     // user.messages = [...(user.messages || [])];
      //     if (user !== selectedUser) user.hasNewMessages = true;

      //     return {
      //       ...user,
      //       messages: [
      //         ...user.messages,
      //         {
      //           content,
      //           fromSelf: false,
      //         },
      //       ],
      //     };
      //   }
      //   return user;
      // });

      users = users.map(user => {

        console.log( user.username, senderUsername)

        if (user.username == senderUsername) {
          console.log('dupa jas')
          user.messages = [
            ...user.messages,
            {
            content,
            fromSelf: false,
          }]
          from

          if (user !== selectedUser)
            user.hasNewMessages = true;
          else {
            selectedUser = user
            selectedUser.messages = user.messages
          }
        }
        return user;
      }
    )
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

<div
  class="left-panel w-full lg:w-4/5 z-50 gird grid-cols-3 h-screen border-l border-muted"
>
  <div class="col-span-1 h-screen flex flex-col">
    {#each myUsers as user, index (user.userID)}
      <User
        selected={user == selectedUser}
        on:SelectedUser={() => onSelectUser(user)}
        bind:user
        {selectedUser}
      />
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
