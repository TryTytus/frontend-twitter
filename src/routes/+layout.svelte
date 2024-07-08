

<script lang="ts">
    import "../app.css";
    import { ModeWatcher } from "mode-watcher";
    import Header from "$lib/custom/blocs/.header.svelte";
  import Sidebar from "$lib/custom/blocs/sidebar.svelte";

  </script>
  
  <div class="flex min-h-screen w-full flex-col">

    <div class="grid grid-flow-col lg:grid-cols-5">
      <Sidebar class="hidden lg:block sticky top-0 max-h-[200px]" />
      <div class="w-full col-span-3 flex my-5">
        <slot></slot>
      </div>
    </div>
 
    <ModeWatcher />
   
  </div>
  


