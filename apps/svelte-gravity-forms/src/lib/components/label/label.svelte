<script lang="ts">
	import { getFormField, type LabelProps } from 'formsnap';

	type $$Props = LabelProps;
	const { actions, errors, ids } = getFormField();
	$: attrs = {
		'data-fs-label': '',
		'data-fs-error': $errors ? '' : undefined,
		for: $ids.input
	};
</script>

<label
	class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
	use:actions.label
	{...$$restProps}
	{...attrs}
>
	<slot />
</label>
