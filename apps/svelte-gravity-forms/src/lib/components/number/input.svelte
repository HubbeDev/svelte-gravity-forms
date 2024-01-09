<script lang="ts">
	import { Input } from '../input/index.js';
	import type { InputEvents } from './index.js';
	import type { HTMLInputAttributes } from 'svelte/elements';

	import { cn } from '$lib/utils.js';

	type $$Props = HTMLInputAttributes;
	type $$Events = InputEvents;

	let className: $$Props['class'] = undefined;

	export { className as class };
</script>

<Input class={cn('', className)} type="number" {...$$restProps} />
