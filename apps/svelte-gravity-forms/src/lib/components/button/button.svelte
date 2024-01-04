<script lang="ts">
	import { getCtx } from '../../ctx.js';
	import { Button } from '$components/ui/button/index.js';
	import type { Props, EventProps } from './types.js';

	type $$Props = Props;
	type $$Events = EventProps;

	export let buttonType: $$Props['buttonType'] = 'button';

	const {
		refs: { submitButtonRef }
	} = getCtx();
</script>

<Button bind:this={$submitButtonRef} type={buttonType} {...$$restProps} on:click on:keydown>
	<slot />
</Button>
