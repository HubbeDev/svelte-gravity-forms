<script lang="ts">
	import { getCtx } from '../../ctx.js';
	import { cn } from '$lib/utils.js';
	import { Button } from '$components/ui/button/index.js';
	import type { Props, EventProps } from './types.js';

	type $$Props = Props;
	type $$Events = EventProps;

	let className: $$Props['class'] = undefined;
	export let buttonType: $$Props['buttonType'] = 'button';
	export let id: $$Props['id'] = '';
	export let width: $$Props['width'] = 'full';
	export let size: $$Props['size'] = 'default';

	const {
		states: { formObject, formSubmtiButton },
		refs: { submitButtonRef },
		helpers: { getButtonWidth }
	} = getCtx();

	export { className as class };

	// join width with other classes
	$: width = width ? `w-${width}` : '';
	$: className = $formSubmtiButton ? cn(getButtonWidth($formSubmtiButton), className) : className;
</script>

<Button
	class={cn('', className)}
	{size}
	bind:this={$submitButtonRef}
	type={buttonType}
	{...$$restProps}
	on:click
	on:keydown
>
	<slot />
</Button>
