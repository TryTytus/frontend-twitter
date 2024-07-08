<script lang="ts">
    	import { Button } from "$lib/components/ui/button/index.js";
        import {  type Props } from "../../../components/ui/button/index";

        type $$Props = Props;

        export let variant: $$Props["variant"] = "ghost";
</script>

<Button variant={variant} class=" w-full justify-start">
    <div class="flex gap-3 items-center">
        <slot/>
    </div>
</Button>