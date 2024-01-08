<script lang="ts">
	import { Select as SelectPrimitive } from 'bits-ui';
	import { getFormField } from 'formsnap';

	type $$Props = SelectPrimitive.Props<unknown>;
	const { setValue, name, value } = getFormField();
	export let onSelectedChange: $$Props['onSelectedChange'] = undefined;
</script>

<SelectPrimitive.Root
	onSelectedChange={(v) => {
		onSelectedChange?.(v);
		setValue(v ? v.value : undefined);
	}}
	{...$$restProps}
>
	<slot />
	<input hidden {name} value={$value} />
</SelectPrimitive.Root>
