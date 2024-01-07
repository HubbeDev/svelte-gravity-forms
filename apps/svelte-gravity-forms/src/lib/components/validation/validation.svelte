<script lang="ts">
	import { Form as FormPrimitive } from 'formsnap';
	import { cn } from '$lib/utils.js';
	import type { HTMLAttributes } from 'svelte/elements';

	type $$Props = HTMLAttributes<HTMLParagraphElement>;
	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<FormPrimitive.Validation
	class={cn('text-destructive pb-3 text-sm font-medium', className)}
	{...$$restProps}
/>
