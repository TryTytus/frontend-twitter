<script>

// @ts-nocheck

    import { createEventDispatcher } from 'svelte';
    import StatusIcon from './StatusIcon.svelte';
  import Button from '$lib/components/ui/button/button.svelte';
  import Textarea from '$lib/components/ui/textarea/textarea.svelte';
  import * as Avatar from '$lib/components/ui/avatar/avatar.svelte';
  
    export let user;
    export let content;
  
    let input = "";

    
    const dispatch = createEventDispatcher();
  
    const onSubmit = () => {
      if (input.length > 0) {
        content = input
        dispatch('message')
        input = "";
      }
    };
  
    const displaySender = (message, index) => {
      return (
        index === 0 || user.messages[index - 1].fromSelf !== message.fromSelf
      );
    };
  </script>
  
  
  <div class="flex flex-col h-screen border-l border-muted">
    <div class="py-3 px-5 leading-10 grow-0 flex items-center gap-3 font-extrabold text-lg border-b border-white">
      <StatusIcon connected={user.connected} />

      <img class="w-10 h-10 rounded-full" src="https://github.com/shadcn.png" alt="" srcset="">

      {user.username}
    </div>

    <ul class="p-5 m-0 grow w-full overflow-scroll">
      {#each user.messages as message, index (index)}
        <li class={` w-full flex ${message.fromSelf ? 'justify-end' : ''}`}
        style="list-style: none;"
        >
          <div>
          {#if displaySender(message, index)}
            <div class={`font-bold mt-1 text-xs text-muted-foreground mb-1 ${message.fromSelf ? 'text-end' : ''}`} >
              {message.fromSelf ? "(you)" : user.username}
            </div>
          {/if}
          <div class={`bg-muted w-min p-2 rounded-xl mb-1 ${message.fromSelf ? 'bg-slate-100 text-muted' : ''}`}>
            {message.content}
          </div>
        </div>
        </li>
      {/each}
    </ul>
  
    <form on:submit|preventDefault={onSubmit} class="grow-0 flex p-4 w-full gap-3">

      <Textarea style="field-sizing: normal;" bind:value={input} placeholder="Your message..." class="min-h-4 grow  max-h-11 resize-none rounded-full" />

      <Button variant="secondary" class="grow-0 rounded-full h-11 w-20" type="submit" disabled={input.length === 0}>Send</Button>
    </form>
  </div>
  

  <style >
    :global(body) {
      overflow: hidden;
    }
  </style>