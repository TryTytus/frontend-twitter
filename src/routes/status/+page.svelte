<script lang="ts">
  import * as Avatar from "$lib/components/ui/avatar/index.js"
  import SidebarButton from "$lib/custom/blocs/sidebar-button.svelte";
  import Tree from "$lib/custom/blocs/tree.svelte";

  import { ArrowLeft, MessageCircle, Bookmark, Download, Heart, Repeat, CircleMinus } from "lucide-svelte";

  let tree:any[] = [{
    "id": 1,
    "content": "My post content",
    "media": "",
    "author": "Author name",
    "author_id": "xyz123",
    "date": "2012-04-23T18:25:43.511Z",
    "comments": [
        {
            "id": 2,
            "content": "My post content",
            "author": "Author name",
            "author_id": "xyz123",
            "date": "2012-04-23T18:25:43.511Z",
            "comments": [
                {
                    "id": 3,
                    "content": "My post content",
                    "author": "Author name",
                    "author_id": "xyz123",
                    "date": "2012-04-23T18:25:43.511Z",
                    "comments": [
                        {
                            "id": 4,
                            "content": "My post content",
                            "author": "Author name",
                            "author_id": "xyz123",
                            "date": "2012-04-23T18:25:43.511Z",
                            "comments": [
                
                            ]
                        }
                    ]
                },
                {
                    "id": 5,
                    "content": "My post content",
                    "author": "Author name",
                    "author_id": "xyz123",
                    "date": "2012-04-23T18:25:43.511Z",
                    "comments": [
        
                    ]
                }

            ]
            
        },
        {
            "id": 6,
            "content": "My post content",
            "author": "Author name",
            "author_id": "xyz123",
            "date": "2012-04-23T18:25:43.511Z",
            "comments": [
                {
                    "id": 7,
                    "content": "My post content",
                    "author": "Author name",
                    "author_id": "xyz123",
                    "date": "2012-04-23T18:25:43.511Z",
                    "comments": [
        
                    ]
                }
            ]
        },
        {
            "id": 8,
            "content": "My post content",
            "author": "Author name",
            "author_id": "xyz123",
            "date": "2012-04-23T18:25:43.511Z",
            "comments": [
                
            ]
        }
    ]
}]

</script>

<main class="border-gray-700 -my-5 w-full border-x min-h-[200vh]">
  <nav class="flex sticky top-0 gap-4  py-4 items-center text-2xl font-semibold ">
    <div class="absolute backdrop-blur-md z-20 bg-white/20 dark:bg-black/20 h-full w-full"></div>
    <div class="lg:w-6"/>
    <ArrowLeft class="w-6 z-30" />
    <h1 class="z-30 text-lg font-semibold leading-none tracking-tight">Post</h1>
</nav>
  <div class=" px-3 lg:px-16 py-2">
    <div class="flex z-0 items-center gap-3">
      <Avatar.Root >
        <Avatar.Image class="avatar" src="https://github.com/shadcn.png" alt="@shadcn" />
        <Avatar.Fallback>CNN</Avatar.Fallback>
      </Avatar.Root>
      <div>
        <h1 class="text-lg font-semibold leading-none tracking-tight">
          Elon Musk
        </h1>

        <h2 class="text-sm text-muted-foreground">
          @elonmusk
        </h2>
          
      </div>

    </div>
  </div>

  <h2 style="font-family: TwitterChirp;" class="mx-2 lg:mx-16 my-2 text-lg">
    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Adipisci pariatur veniam molestiae repellat totam assumenda, explicabo voluptatem cumque suscipit eveniet praesentium aut? Natus voluptates dolorem vel odit obcaecati eos esse!
    Nisi dolorum, in dolore totam inventore sint praesentium quod laudantium quisquam laborum suscipit animi quo debitis, sed placeat nulla, necessitatibus ab obcaecati neque reprehenderit quis velit reiciendis iure non. Placeat?
    Iusto libero aliquam hic rerum explicabo cupiditate ea, laboriosam saepe consectetur temporibus aut, iste aperiam sunt, aliquid ipsam quasi? Facere doloremque obcaecati sunt architecto nobis fugiat saepe magni, amet harum.
  </h2>

  <div class="flex text-sm mx-2 lg:mx-6 text-muted-foreground">
    <p >
      5:04 AM · Jul 8, 2024 ·
    </p>
    <p class="text-white">
      &nbsp;118K&nbsp;
    </p>
    <p>
      Views
    </p>
  </div>
  <nav class="flex justify-between border-y border-gray-600 my-2 mx-2 lg:mx-6 px-6 py-3">
    <MessageCircle class="hover:stroke-blue-400" />
    <Repeat class="hover:stroke-green-400" />
    <Heart class="hover:stroke-pink-500" />
    <Bookmark class="hover:stroke-blue-400" />
    <Download class="hover:stroke-blue-400" />
  </nav>

 <div>
  <Tree {tree} let:node>
    <div class="flex gap-3">
      <Avatar.Root style="width: 2rem; height: 2rem;"  >
        <Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
        <Avatar.Fallback>CNN</Avatar.Fallback>
      </Avatar.Root>
      <h1 class="  pt-1 font-bold leading-none tracking-tight">
        Elon Musk
      </h1>
    </div>
    <div class="px-12 text-sm">
      {node.id} {node.content}
    </div>

  </Tree>
 </div>


</main>

<style>

</style>