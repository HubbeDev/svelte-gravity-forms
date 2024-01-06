<script lang="ts">
	import { Label as LabelPrimitive } from 'bits-ui';
	import { getFormField } from 'formsnap';
	import { cn } from '$lib/utils.js';

	type $$Props = LabelPrimitive.Props;
	type $$Events = LabelPrimitive.Events;

	let className: $$Props['class'] = undefined;
	export { className as class };

	const { errors } = getFormField();

	$: className = $errors ? cn($errors && 'text-destructive', className) : className;
</script>

<LabelPrimitive.Root
	class={cn(
		'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
		className
	)}
	{...$$restProps}
	on:mousedown
>
	<slot />
</LabelPrimitive.Root>
