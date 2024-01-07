<script lang="ts">
	import { getFormField } from 'formsnap';
	import type { HTMLInputAttributes } from 'svelte/elements';
	import { cn } from '$lib/utils.js';
	import type { InputEvents } from './index.js';

	type $$Props = HTMLInputAttributes;
	type $$Events = InputEvents;

	/* 	const { attrStore, value } = getFormField(); */
	const { attrStore, value } = getFormField();
	let className: $$Props['class'] = undefined;
	export let type: $$Props['type'] = 'text';

	export { className as class };

	function typeAction(node: HTMLInputElement) {
		if (!type) return;
		node.type = type;
	}
</script>

<input
	use:typeAction
	class={cn(
		'border-input ring-offset-background file:text-foreground placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border bg-transparent px-3  py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
		className
	)}
	{...$attrStore}
	bind:value={$value}
	{...$$restProps}
	on:blur
	on:change
	on:click
	on:focus
	on:keydown
	on:keypress
	on:keyup
	on:mouseover
	on:mouseenter
	on:mouseleave
	on:paste
	on:input
/>
