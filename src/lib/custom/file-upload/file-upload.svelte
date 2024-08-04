<script lang="ts">
  import { CloudUpload } from "lucide-svelte";
  import type { FileInputEvents } from "lucide-svelte/icons/file-input";

  let imageUrl = "";
  export let id: string;


  function handleFileChange(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        imageUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
</script>

<div class="flex items-center justify-center w-full">
  <label
    for={id}
    class="flex flex-col items-center justify-center w-full border-2 border-dashed rounded-lg cursor-pointer hover:bg-accent border-input dark:hover:border-gray-500"
  >
    {#if !imageUrl}
      <div class="flex flex-col items-center justify-center pt-5 pb-6">
        <CloudUpload class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" />
        <p class="mb-2 text-sm text-primary px-10  dark:text-primary">
          <span class="font-semibold">Click to upload</span> or drag and drop
        </p>
        <p class="text-xs text-muted-foreground">
          PNG, JPG (MAX. 800x400px)
        </p>
      </div>
    {/if}
      <slot {handleFileChange} />

    {#if imageUrl}
      <div class="flex items-center justify-center">
        <!-- svelte-ignore a11y-img-redundant-alt -->
        <img
          src={imageUrl}
          alt="Image Preview"
          class="max-w-full h-auto rounded-lg z-20"
        />
      </div>
    {/if}
  </label>
</div>
