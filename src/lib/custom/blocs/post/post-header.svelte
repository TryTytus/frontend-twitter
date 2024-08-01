<script lang="ts">
  import { ArrowLeft } from "lucide-svelte";
</script>

<nav class="flex sticky top-0 gap-4 py-4 items-center text-2xl font-semibold">
  <div
    class="absolute backdrop-blur-md z-20 bg-white/20 dark:bg-black/20 h-full w-full"
  ></div>
  <div class="lg:w-6" />
  <button class="z-30" on:click={() => window.history.back()}>
    <ArrowLeft class="w-6 z-30" />
  </button>
  <h1 class="z-30 text-lg font-semibold leading-none tracking-tight">Post</h1>
</nav>
