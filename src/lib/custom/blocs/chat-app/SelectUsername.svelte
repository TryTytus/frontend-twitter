<script>
// @ts-nocheck


  
    import { createEventDispatcher } from 'svelte';
    // @ts-ignore
    import { onMount } from 'svelte';
    
    export let username = ''

    const dispatch = createEventDispatcher();
  
    const isValid = () => {
      return username.length > 2;
    };
  
    const onSubmit = () => {
      if (isValid()) {
        dispatch('SubmittedUsername', { username })
        // onUsernameSelection();
      }
    };
  </script>
  
  <style>
    .select-username {
      width: 300px;
      margin: 200px auto 0;
    }
  </style>
  
  <div class="select-username">
    <form on:submit|preventDefault={onSubmit}>
      <input bind:value={username} placeholder="Your username..." />
      <button type="submit">Send</button>
    </form>
  </div>
  