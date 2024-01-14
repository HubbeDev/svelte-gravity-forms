<script lang="ts">
	import type { ValidationProps } from 'formsnap';
	import { getFormField } from 'formsnap';

	type $$Props = ValidationProps;

	export let tag = 'p';
	const { actions, errors, ids } = getFormField();

	$: attrs = {
		'data-gf-validation': '',
		'data-gf-error': $errors ? '' : undefined,
		id: $ids.validation
	};
</script>

<svelte:element
	this={tag}
	use:actions.validation
	class="pb-3 text-sm font-medium text-destructive"
	{...attrs}
	{...$$restProps}
>
	{#if $errors}
		{$errors}
	{/if}
</svelte:element>
