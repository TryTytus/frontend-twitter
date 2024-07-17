<script lang="ts">
  import { onMount, onDestroy } from "svelte";

  import * as React from "react";
  import * as ReactDOM from "react-dom";
  import { browser } from '$app/environment';

  import SuperTokensReactComponent from './supertokens';

  let rootId = 'rootId'


  onMount(() => {
    if (browser)
     ReactDOM.render(React.createElement(SuperTokensReactComponent), document.getElementById('rootId'));
  });

  onDestroy(() => {
    if (browser)
     ReactDOM.unmountComponentAtNode(document.getElementById('rootId') as Element);
  });

</script>

<main class="fixed top-0 left-0 z-50 w-full h-full bg-black">
  <div id="rootId"></div>
</main>
