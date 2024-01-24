<script lang="ts" context="module">
	import type { HTMLInputAttributes } from 'svelte/elements';
	import type { InputEvents } from './index.js';
	import type { NumberFormats } from '$lib/internal/types.js';
</script>

<script lang="ts">
	import { writable } from 'svelte/store';
	import { getFormField } from 'formsnap';
	import { cn } from '$lib/utils.js';
	import { Input } from '../input/index.js';

	type $$Props = HTMLInputAttributes & {
		numberFormat?: NumberFormats;
	};
	type $$Events = InputEvents;

	let className: $$Props['class'] = undefined;
	export let numberFormat: $$Props['numberFormat'] = undefined;

	const { attrStore, errors, value } = getFormField();

	$: attrs = {
		'data-svelte-gf-input': '',
		'data-svelte-gf-error': $errors ? '' : undefined,
		...$attrStore
	};

	export { className as class };

	function handleKeyPress(e: KeyboardEvent) {
		const charCode = e.which ? e.which : e.keyCode;
		if (
			charCode > 31 &&
			(charCode < 48 || charCode > 57) &&
			charCode !== 46 &&
			!(numberFormat === 'decimal_comma' && charCode === 44) &&
			!(numberFormat === 'decimal_dot' && charCode === 46)
		) {
			e.preventDefault();
		}
	}

	let numericValue = writable<number | unknown>(undefined);
	let inputValue = writable<string | number | unknown>($value);

	$: {
		if (!isNaN(Number($value)) && $value !== '') {
			$numericValue = Number($value);
		} else {
			$numericValue = undefined; // allow the input to be empty
		}

		if ($numericValue !== undefined && $numericValue !== '') {
			$value = $numericValue;
		} else {
			$value = undefined;
		}

		$inputValue =
			$numericValue !== undefined && $numericValue !== '' ? Number($numericValue) : undefined;
	}
</script>

<Input
	class={cn(
		'flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0  file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
		className
	)}
	{...attrs}
	type="number"
	step="1.00"
	bind:value={$value}
	on:keypress={(e) => handleKeyPress(e.detail)}
	{...$$restProps}
/>
