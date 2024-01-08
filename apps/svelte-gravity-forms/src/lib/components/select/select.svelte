<script lang="ts">
	import * as GFform from './index.js';
	import type { SelectProps } from './index.js';

	type $$Props = SelectProps;

	export let placeholder: $$Props['placeholder'] = undefined;
	export let choices: $$Props['choices'];
</script>

<GFform.Select {...$$restProps}>
	<GFform.SelectTrigger {placeholder}>
		<GFform.SelectValue {placeholder} />
	</GFform.SelectTrigger>
	<GFform.SelectContent>
		{#each choices as choice}
			<GFform.SelectItem value={choice.value} label={choice.text}>
				{choice.text}
			</GFform.SelectItem>
		{/each}
	</GFform.SelectContent>
</GFform.Select>
