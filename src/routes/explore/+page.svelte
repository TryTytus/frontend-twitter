<script lang="ts">
  import Calculator from "lucide-svelte/icons/calculator";
  import Calendar from "lucide-svelte/icons/calendar";
  import CreditCard from "lucide-svelte/icons/credit-card";
  import Settings from "lucide-svelte/icons/settings";
  import Smile from "lucide-svelte/icons/smile";
  import User from "lucide-svelte/icons/user";
  import * as Command from "$lib/components/ui/command/index.js";
  import * as Avatar from "$lib/components/ui/avatar/index.js";

  import PersonCard from "$lib/custom/blocs/person-card/person-card.svelte"
  import * as Tabs from "$lib/components/ui/tabs";


  import { onMount } from "svelte";

  let open = false;

  let myElement: HTMLElement;

  const handleClick = (event) => {
    if (myElement && !myElement.contains(event.target)) {
      // myElement.style.display = 'none';
      open = false;
    } else open = true;
  };

  const preventPropagation = (event) => {
    event.stopPropagation();
  };

  onMount(() => {
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  });
</script>

<div class=" w-full pt-4 h-screen border border-secondary">
<div class="w-full flex justify-center">
  <button bind:this={myElement} on:click={handleClick} class="w-full max-w-[30rem] absolute">
    <Command.Root class=" rounded-3xl  h-fit border shadow-md">
      <Command.Input placeholder="Type a command or search..." />
      {#if open}
        <Command.List class="bg-black">
          <Command.Empty>No results found.</Command.Empty>
          <Command.Group heading="People">
              {#each Array(5).keys() as num}
                <Command.Item>
                  <PersonCard id={num.toString()} />
                </Command.Item>
              {/each}
            <Command.Item>
              <Smile class="mr-2 h-4 w-4" />
              <span>Search Emoji</span>
            </Command.Item>
            <Command.Item>
              <Calculator class="mr-2 h-4 w-4" />
              <span>Calculator</span>
            </Command.Item>
          </Command.Group>
          <Command.Separator />
          <Command.Group heading="Settings">
            <Command.Item>
              <User class="mr-2 h-4 w-4" />
              <span>Profile</span>
              <Command.Shortcut>⌘P</Command.Shortcut>
            </Command.Item>
            <Command.Item>
              <CreditCard class="mr-2 h-4 w-4" />
              <span>Billing</span>
              <Command.Shortcut>⌘B</Command.Shortcut>
            </Command.Item>
            <Command.Item>
              <Settings class="mr-2 h-4 w-4" />
              <span>Settings</span>
              <Command.Shortcut>⌘S</Command.Shortcut>
            </Command.Item>
          </Command.Group>
          <div class="h-2"></div>
        </Command.List>
      {/if}
    </Command.Root>
  </button>
</div>
<Tabs.Root value="account" class="w-full mt-16">
  <Tabs.List class="w-full flex justify-evenly">
    <Tabs.Trigger value="top">Top</Tabs.Trigger>
    <Tabs.Trigger value="latest">Latest</Tabs.Trigger>
    <Tabs.Trigger value="people">People</Tabs.Trigger>
    <Tabs.Trigger value="media">Media</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="account">
    Make changes to your account here.
  </Tabs.Content>
  <Tabs.Content value="password">Change your password here.</Tabs.Content>
</Tabs.Root>

</div>
