<script lang="ts">
  import { createEventDispatcher } from "svelte";


const dispatch = createEventDispatcher();

let sayHello = () => {
  dispatch('message', {
    text: 'Helooo'
  });
}

</script>

<button on:click={sayHello}> BENIO </button>