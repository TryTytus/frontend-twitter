<script lang="ts">
  import * as Avatar from "$lib/components/ui/avatar/index.js";
  import * as Card from "$lib/components/ui/card/index.js";
  import { Footer } from "$lib/components/ui/sheet";
  import { Bookmark, Download, Heart, MessageCircle, Repeat } from "lucide-svelte";


  let color = "#FFFFFF"
  

  </script>
   
   <div class="w-full px-4">
  <Card.Root class="  lg:w-[600px]">
    <Card.Header>
      <div class="flex items-center gap-3">
        <Avatar.Root>
          <Avatar.Image class="z-0" src="/morty.jpeg" alt="@shadcn" />
          <Avatar.Fallback>CNN</Avatar.Fallback>
        </Avatar.Root>
        <div>
          <Card.Title>Elon Musk</Card.Title>

          <Card.Description>
            Tesla Gigafactory Supercomputer Cluster
          </Card.Description>
        </div>

      </div>

    </Card.Header>
    <Card.Content>
      <img class="z-0 lg:aspect-[1/1] object-cover rounded" src="/cards.avif" alt="" srcset="">
    </Card.Content>
    <Card.Footer class="flex mx-4 justify-between">
        <MessageCircle class="hover:stroke-blue-400" />
        <Repeat class="hover:stroke-green-400" />
        <Heart class="hover:stroke-pink-500" />
        <Bookmark class="hover:stroke-blue-400" />
        <Download class="hover:stroke-blue-400" />
    </Card.Footer>
  </Card.Root>
</div>

