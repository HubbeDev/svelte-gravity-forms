<script lang="ts">
	import { getFormField } from 'formsnap';
	import type { HTMLInputAttributes } from 'svelte/elements';
	import { cn } from '$lib/utils.js';

	type $$Props = HTMLInputAttributes;

	let className: $$Props['class'] = undefined;

	const { attrStore, errors, actions } = getFormField();

	$: attrs = {
		'data-svelte-gf-input': '',
		'data-svelte-gf-error': $errors ? '' : undefined,
		...$attrStore
	};

	export { className as class };
</script>

<input
	class={cn(
		'border-input ring-offset-background file:text-foreground placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border bg-transparent px-3  py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
		className
	)}
	{...attrs}
	use:actions.input
	{...$$restProps}
/>
