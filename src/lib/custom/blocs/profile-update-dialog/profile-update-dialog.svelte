<script lang="ts">
  import { Button, buttonVariants } from "$lib/components/ui/button/index.js";
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
  import Separator from "$lib/components/ui/separator/separator.svelte";
  import Textarea from "$lib/components/ui/textarea/textarea.svelte";
  import FileUpload from "$lib/custom/file-upload/file-upload.svelte";
  import type { UserViewModel } from "$lib/viewmodels/user-viewmodel";
  import * as Session from "supertokens-auth-react/recipe/session";
  import { getContext } from "svelte";


  let avatar: FileList;
  let bgImg: FileList;
  let bio = "";


  let userViewModel: UserViewModel = getContext("userViewModel");


  async function handleSubmit() {
    const formData = new FormData();
    formData.append("avatar", avatar[0]);
    formData.append("bgImg", bgImg[0]);
    formData.append("bio", bio);

    userViewModel.updateProfile(formData)
  }
</script>

<Dialog.Root>
  <slot />

  <Dialog.Content class="sm:max-w-[425px] md:max-w-fit">
    <Dialog.Header>
      <Dialog.Title>Edit profile</Dialog.Title>
      <Dialog.Description>
        Make changes to your profile here. Click save when you're done.
      </Dialog.Description>
    </Dialog.Header>
    <div class="grid gap-4 py-4">
      <div class="grid gap-4 grid-cols-1">
        <Label for="name">Bio</Label>
        <Textarea
          bind:value={bio}
          placeholder="My amazing bio... 🚀"
          class="max-h-28"
          id="name"
        ></Textarea>
      </div>

      <div class="flex">
        <div class="w-1/2">
          <Label>Avatar</Label>
          <FileUpload id="avatar-file" let:handleFileChange>
            <input
              bind:files={avatar}
              id="avatar-file"
              type="file"
              class="hidden"
              on:change={handleFileChange}
            />
          </FileUpload>
        </div>

        <Separator class=" mx-4" orientation="vertical"></Separator>

        <div class="w-1/2">
          <Label>Background Image</Label>
          <FileUpload id="bgImg-file" let:handleFileChange>
            <input
              bind:files={bgImg}
              id="bgImg-file"
              type="file"
              class="hidden"
              on:change={handleFileChange}
            />
          </FileUpload>
        </div>
      </div>
    </div>
    <Dialog.Footer>
      <Button on:click={handleSubmit}>Save changes</Button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>
