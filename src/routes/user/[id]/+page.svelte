<script lang="ts">
  import { CircleUser } from "lucide-svelte";
  import TextCard from "$lib/custom/blocs/text-card/text-card.svelte";
  import ProfileUpdateDialog from "$lib/custom/blocs/profile-update-dialog/profile-update-dialog.svelte";
  import { buttonVariants } from "$lib/components/ui/button";
  import * as Dialog from "$lib/components/ui/dialog/index.js";
</script>

<div class="grid w-full border-x">
  <div class="w-full h-52 bg-muted rounded-b-xl">
    <CircleUser class="w-36  h-36 mt-36 ml-10 bg-gray-500 rounded-full" />
  </div>

  <div class="mt-[5.4rem] ml-16">
    <h1 class=" text-3xl font-semibold tracking-tight transition-colors">
      Adam Tytoń
    </h1>
    <h2 class="text-muted-foreground">@trytytus</h2>

    <p class="mt-2 mb-4">
      Premier Rzeczypospolitej Polskiej 🇵🇱 Prime Minister of Poland 🇵🇱
    </p>

    <ProfileUpdateDialog>
      <Dialog.Trigger class={buttonVariants({ variant: "outline" })}
        >Edit Profile</Dialog.Trigger
      >
    </ProfileUpdateDialog>
  </div>

  <div class="border-t mt-10 w-full">
    <div class="mx-auto inline-block -mt-6">
      {#each Array(5).keys() as idx}
        <TextCard profile={true} />
      {/each}
    </div>
  </div>
</div>
