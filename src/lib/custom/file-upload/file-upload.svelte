<script>
  import { CloudUpload } from "lucide-svelte";

</script>
<div class="flex items-center justify-center w-full">
  <label
    for="dropzone-file"
    class="flex flex-col items-center justify-center w-full border-2 border-dashed rounded-lg cursor-pointer hover:bg-accent border-input dark:hover:border-gray-500"
  >
    <div class="flex flex-col items-center justify-center pt-5 pb-6">

      <CloudUpload class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" />
      <p class="mb-2 text-sm text-primary dark:text-primary">
        <span class="font-semibold">Click to upload</span> or drag and drop
      </p>
      <p class="text-xs text-muted-foreground">
        SVG, PNG, JPG or GIF (MAX. 800x400px)
      </p>
    </div>
    <input id="dropzone-file" type="file" class="hidden" />
  </label>
</div>
