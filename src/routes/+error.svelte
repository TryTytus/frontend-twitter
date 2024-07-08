<script lang="ts">
  import { page } from "$app/stores";
</script>

<main
  class="fixed top-0 left-0 z-50 w-full bg-black h-full grid place-content-center"
>
  <h1 class="text-4xl">
    {$page.status} | {$page.error?.message}
  </h1>

  <a class="w-full mt-4 text-sm underline text-center" href="/"> 
    Go Home
</a>

</main>
