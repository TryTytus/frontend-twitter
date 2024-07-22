<script lang="ts">
  import Tree from "$lib/custom/blocs/tree/tree.svelte";
  import CommentSection from "$lib/custom/blocs/comment-section.svelte";
  import Post from "$lib/custom/blocs/post/post.svelte";
  import type { PageData } from "../$types";

  export let data: PageData;

  // let tree = [
  //   {
  //     id: 1,
  //     content: "My post content",
  //     media: "",
  //     author: "Author name",
  //     author_id: "xyz123",
  //     date: "2012-04-23T18:25:43.511Z",
  //     comments: [
  //       {
  //         id: 2,
  //         content: "My post content",
  //         author: "Author name",
  //         author_id: "xyz123",
  //         date: "2012-04-23T18:25:43.511Z",
  //         comments: [
  //           {
  //             id: 3,
  //             content: "My post content",
  //             author: "Author name",
  //             author_id: "xyz123",
  //             date: "2012-04-23T18:25:43.511Z",
  //             comments: [
  //               {
  //                 id: 4,
  //                 content: "My post content",
  //                 author: "Author name",
  //                 author_id: "xyz123",
  //                 date: "2012-04-23T18:25:43.511Z",
  //                 comments: [],
  //               },
  //             ],
  //           },
  //           {
  //             id: 5,
  //             content: "My post content",
  //             author: "Author name",
  //             author_id: "xyz123",
  //             date: "2012-04-23T18:25:43.511Z",
  //             comments: [],
  //           },
  //         ],
  //       },
  //       {
  //         id: 6,
  //         content: "My post content",
  //         author: "Author name",
  //         author_id: "xyz123",
  //         date: "2012-04-23T18:25:43.511Z",
  //         comments: [
  //           {
  //             id: 7,
  //             content: "My post content",
  //             author: "Author name",
  //             author_id: "xyz123",
  //             date: "2012-04-23T18:25:43.511Z",
  //             comments: [],
  //           },
  //         ],
  //       },
  //       {
  //         id: 8,
  //         content: "My post content",
  //         author: "Author name",
  //         author_id: "xyz123",
  //         date: "2012-04-23T18:25:43.511Z",
  //         comments: [],
  //       },
  //     ],
  //   },
  // ];
  
</script>

<main class="border-gray-700 -my-5 w-full border-x min-h-[100vh]">
  <Post author={data?.post?.user?.name} nickname={data?.post?.user?.nickname} content={data?.post?.content} />

  <div class="mb-6">
    <Tree tree={data?.comments} let:node>
      <CommentSection {node} />
    </Tree>
  </div>
</main>
