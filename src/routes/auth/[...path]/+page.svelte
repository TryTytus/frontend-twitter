<script lang="ts">
  import { onMount, onDestroy } from "svelte";

  import * as React from "react";
  import * as ReactDOM from "react-dom";
  import { browser } from '$app/environment';

  import SuperTokensReactComponent from './supertokens';

  onMount(() => {
    if (browser)
     ReactDOM.render(React.createElement(SuperTokensReactComponent), document.getElementById('rootId'));
  });

  onDestroy(() => {
    if (browser)
     ReactDOM.unmountComponentAtNode(document.getElementById('rootId') as Element);
  });

</script>

<main class="fixed top-0 left-0 z-50 w-full h-full grid place-content-center bg-black">
  <div id="rootId"></div>
</main>


