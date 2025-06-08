<script lang="ts">
  import * as Command from "$lib/components/ui/command/index.js";
  import { MeiliSearch } from "meilisearch";
  import PersonCard from "$lib/custom/blocs/person-card/person-card.svelte";
  import * as Tabs from "$lib/components/ui/tabs";
  import { onMount } from "svelte";
  import { Search } from "lucide-svelte";
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import type { PageServerData } from "./$types";
  import TextCard from "$lib/custom/blocs/text-card/text-card.svelte";
  import Avatar from "$lib/components/ui/avatar/avatar.svelte";
  import { writable } from "svelte/store";

  let tabVal = "top";

  async function handleTabChange() {
    let sort = $page.url.searchParams.get("sort");

    if (sort === null) sort = "top";

    const mapper = {
      latest: "createdAt",
      top: "likesCount",
    };

    const mapper2 = new Map([
      ["latest", "createdAt"],
      ["top", "likesCount"],
    ]);

    data.posts = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/post?orderBy=${mapper2.get(sort) || "createdAt"}`
    ).then((res) => {
      console.log(res.url);
      return res.json();
    });
  }

  let open = false;

  let myElement: HTMLElement;
  export let value = "";

  export let data: PageServerData;

  let postR = writable(data.posts || []);

  const handleClick = (event) => {
    if (myElement && !myElement.contains(event.target)) {
      // myElement.style.display = 'none';
      open = false;
    } else open = true;
  };

    const closeDialog = (content: string) => {
      value = content;
      open = false;
  };

  let users: any[] = [];
  let posts: any[] = [];

  const preventPropagation = (event) => {
    event.stopPropagation();
  };

  function goTop() {
    $page.url.searchParams.set("sort", "top");
    goto(`/explore?${$page.url.searchParams.toString()}`, {});
    handleTabChange();
    tabVal = "top";
  }

  function goLatest() {
    $page.url.searchParams.set("sort", "latest");
    goto(`/explore?${$page.url.searchParams.toString()}`, {});
    handleTabChange();
    tabVal = "latest";
  }

  function goPeople() {
    $page.url.searchParams.set("sort", "people");
    goto(`/explore?${$page.url.searchParams.toString()}`);
  }

  onMount(() => {
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  });

  const client = new MeiliSearch({
    host: "http://127.0.0.1:7700",
  });

  async function handleChange() {
    console.log(value);
    const results: any = await fetch("http://127.0.0.1:7700/multi-search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer azx93WWgAJw1CsCIfvYB9DPc71FEo-gTRSUWvGCbhBA",
      },
      body: JSON.stringify({
        queries: [
          {
            indexUid: "users",
            limit: 5,
            offset: 0,
            q: value,
          },
          {
            indexUid: "posts",
            limit: 5,
            offset: 0,
            q: value,
          },
        ],
      }),
    }).then((res) => res.json());

    console.log(results.results[0].hits);

    users = results.results[0].hits;
    posts = results.results[1].hits;

    postR.set(data.posts.filter((post) => posts.some((p) => p.id === post.id)));
  }
</script>

<div class=" w-full pt-4 h-screen border border-secondary">
  <div class="w-full flex justify-center">
    <button
      bind:this={myElement}
      on:click={handleClick}
      on:keydown={handleChange}
      class="w-full max-w-[30rem] absolute"
    >
      <Command.Root class=" rounded-3xl  h-fit border shadow-md">
        <Command.Input bind:value placeholder="Type a command or search..." />
        {#if open}
          <Command.List class="bg-black">
            <Command.Empty>No results found.</Command.Empty>
            <Command.Group heading="People">
              <!-- {#each Array(5).keys() as num}
                <Command.Item>
                  <PersonCard id={num.toString()} />
                </Command.Item>
              {/each} -->

              {#each users as user (user.id)}
                <Command.Item
                >
                  <PersonCard
                    id={user.id}
                    name={user.name}
                    nickname={user.nickname}
                    avatar={user.avatar ? `${import.meta.env.VITE_BACKEND_URL}/${user.avatar}` : "/morty.jpeg"}
                  />
                </Command.Item>
              {/each}
            </Command.Group>
            <Command.Separator />
            <Command.Group heading="Posts">
              {#each posts as post (post.id)}
                <Command.Item>
                  <Search class="mr-2 h-4 w-4" />
                  <button
                    on:click={() => {closeDialog(post.content)}}
                  >{post.content}</button>
                  <span class="hidden">{post.id}</span>
                </Command.Item>
              {/each}
            </Command.Group>
            <div class="h-2"></div>
          </Command.List>
        {/if}
      </Command.Root>
    </button>
  </div>
  <Tabs.Root value="top" class="w-full mt-16">
    <!-- <Tabs.List class="w-full flex justify-evenly">
      <Tabs.Trigger on:click={goTop} value="top">Top</Tabs.Trigger>
      <Tabs.Trigger on:click={goLatest} value="latest">Latest</Tabs.Trigger>
      <Tabs.Trigger on:click={goPeople} value="people">People</Tabs.Trigger>
    </Tabs.List> -->
    <Tabs.Content value="top">
      <div>
        {#each $postR as post}
          <TextCard
            profile={true}
            id={post.id}
            nickname={post.user.nickname}
            author={post.user.name}
            content={post.content}
            isLiked={post.isLiked}
            likesCount={post.likesCount}
            commentsCount={post.commentsCount}
            viewsCount={post.viewsCont}
            isBookmarked={post.isBookmarked}
            avatar={post.user.avatar}
          />
        {/each}
      </div>
    </Tabs.Content>
    <Tabs.Content value="latest">
      <div>
        {#each $postR as post}
          <TextCard
            profile={true}
            id={post.id}
            nickname={post.user.nickname}
            author={post.user.name}
            content={post.content}
            isLiked={post.isLiked}
            likesCount={post.likesCount}
            commentsCount={post.commentsCount}
            viewsCount={post.viewsCont}
            isBookmarked={post.isBookmarked}
            avatar={post.user.avatar}
          />
        {/each}
      </div>
    </Tabs.Content>
  </Tabs.Root>
</div>
