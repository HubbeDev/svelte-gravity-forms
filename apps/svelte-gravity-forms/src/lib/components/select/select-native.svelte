<script lang="ts">
	import { getFormField, type SelectProps } from 'formsnap';
	import { ChevronDown } from 'lucide-svelte';
	import { buttonVariants } from '$components/button/index.js';
	import { cn } from '$lib/utils.js';

	type $$Props = SelectProps;
	const { actions, errors, attrStore } = getFormField();

	$: attrs = {
		'data-gf-select': '',
		'data-gf-error': $errors ? '' : undefined,
		...$attrStore
	};
</script>

<div class="relative">
	<select
		class={cn(
			buttonVariants({ variant: 'outline' }),
			'w-full appearance-none bg-transparent font-normal'
		)}
		{...$$restProps}
		use:actions.select
		{...attrs}
	>
		<slot />
	</select>
	<slot name="icon">
		<ChevronDown class="absolute right-3 top-2.5 h-4 w-4 opacity-50" />
	</slot>
</div>
