<script lang="ts">
	import { getFormField } from 'formsnap';
	import type { HTMLInputAttributes } from 'svelte/elements';
	import { cn } from '$lib/utils.js';

	type $$Props = HTMLInputAttributes;

	let className: $$Props['class'] = undefined;

	const { attrStore, errors, actions, value } = getFormField();

	$: attrs = {
		'data-svelte-gf-input': '',
		'data-svelte-gf-error': $errors ? '' : undefined,
		...$attrStore
	};

	export { className as class };
</script>

<input
	class={cn(
		'flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0  file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
		className
	)}
	{...attrs}
	bind:value={$value}
	use:actions.input
	{...$$restProps}
/>
