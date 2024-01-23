<script lang="ts">
	import { getFormField } from 'formsnap';
	import type { HTMLTextareaAttributes } from 'svelte/elements';
	import type { TextareaGetFormField } from './index.js';
	import { cn } from '$lib/utils.js';
	import { type TextareaEvents } from './index.js';

	type $$Props = HTMLTextareaAttributes;
	type $$Events = TextareaEvents;

	let className: $$Props['class'] = undefined;

	const { attrStore, value, actions } = getFormField() as TextareaGetFormField;

	export { className as class };
</script>

<textarea
	class={cn(
		'flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
		className
	)}
	{...$attrStore}
	bind:value={$value}
	use:actions.textarea
	{...$$restProps}
/>
