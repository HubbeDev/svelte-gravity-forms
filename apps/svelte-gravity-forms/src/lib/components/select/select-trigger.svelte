<script lang="ts">
	import { getFormField } from 'formsnap';
	import { Select as SelectPrimitive } from 'bits-ui';
	import { ArrowUpDown } from 'lucide-svelte';
	import { cn } from '$lib/utils.js';
	import { Select } from './index.js';

	import type { Select as SelectPrimitive } from 'bits-ui';

	type $$Props = SelectPrimitive.TriggerProps & {
		placeholder?: string;
	};
	type $$Events = SelectPrimitive.TriggerEvents;

	let className: $$Props['class'] = undefined;

	const { attrStore } = getFormField();
	export let placeholder = '';

	export { className as class };
</script>

<SelectPrimitive.Trigger
	{...$attrStore}
	on:click
	on:keydown
	class={cn(
		'border-input ring-offset-background placeholder:text-muted-foreground focus:ring-ring flex h-9 w-full items-center justify-between rounded-md border bg-transparent px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 disabled:cursor-not-allowed disabled:opacity-50',
		className
	)}
	{...$$restProps}
>
	<Select.Value {placeholder} />
	<slot />
	<div>
		<ArrowUpDown class="h-4 w-4 opacity-50" />
	</div>
</SelectPrimitive.Trigger>
