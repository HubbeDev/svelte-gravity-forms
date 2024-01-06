<script lang="ts">
	import { Button as ButtonPrimitive } from 'bits-ui';
	import { buttonVariants, type Props, type Events } from './index.js';
	import { getCtx } from '../../ctx.js';
	import { cn } from '$lib/utils.js';

	type $$Props = Props;
	type $$Events = Events;

	let className: $$Props['class'] = undefined;
	export let variant: $$Props['variant'] = 'default';
	export let buttonType: $$Props['buttonType'] = 'button';
	export let width: $$Props['width'] = 'full';
	export let size: $$Props['size'] = 'default';
	export let builders: $$Props['builders'] = [];
	export { className as class };

	const {
		states: { formSubmtiButton },
		refs: { submitButtonRef },
		helpers: { getButtonWidth }
	} = getCtx();

	// join width with other classes
	$: width = width ? `w-${width}` : '';
	$: className = $formSubmtiButton ? cn(getButtonWidth($formSubmtiButton), className) : className;
</script>

<ButtonPrimitive.Root
	{builders}
	class={cn(buttonVariants({ variant, size, className }))}
	bind:this={$submitButtonRef}
	type={buttonType}
	{...$$restProps}
	on:click
	on:keydown
>
	{#if $formSubmtiButton?.text}
		{$formSubmtiButton.text}
	{:else if $formSubmtiButton?.imageUrl}
		<img src={$formSubmtiButton.imageUrl} alt="" width="20" height="20" class="h-5 w-5" />
	{:else}
		Submit
	{/if}
</ButtonPrimitive.Root>
