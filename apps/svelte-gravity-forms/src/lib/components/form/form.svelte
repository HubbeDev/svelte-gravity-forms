<script lang="ts">
	import type { Props } from './types.js';
	import { getCtx } from '../../ctx.js';
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	type $$Props = Props;

	export let formId: $$Props['formId'] = undefined;

	const {
		refs: { formRef }
	} = getCtx();
</script>

{#if !formId}
	<p>Please provide a formId</p>
{:else}
	<form bind:this={$formRef} data-svelte-gf {...$$restProps}>
		<slot />
	</form>
{/if}
