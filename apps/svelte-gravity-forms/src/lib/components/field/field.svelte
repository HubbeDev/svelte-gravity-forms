<script lang="ts">
	import * as GFform from '$lib/components/form/index.js';
	import type { Props, InputEvents } from './index.js';
	import { getCtx } from '$lib/ctx.js';

	type $$Props = Props;
	type $$Events = InputEvents;

	let className: $$Props['class'] = undefined;

	export let fieldId: $$Props['fieldId'] = undefined;
	export let label: $$Props['label'] = undefined;
	export let labelPosition: $$Props['labelPosition'] = undefined;
	export let description: $$Props['description'] = undefined;
	export let descriptionPosition: $$Props['descriptionPosition'] = undefined;
	export let isRequired: $$Props['isRequired'] = undefined;
	export let defaultValue: $$Props['defaultValue'] = undefined;
	export let placeholder: $$Props['placeholder'] = undefined;
	export let columnSpan: $$Props['columnSpan'] = undefined;
	export let config: $$Props['config'] = undefined;
	export let index: $$Props['fieldIndex'] = undefined;

	const {
		helpers: { getColumnSpan, showFieldLabel },
		states: { formRequiredIndicator }
	} = getCtx();

	/* 	export { className as class }; */
</script>

<div data-svelte-gf-field-id={index} class={columnSpan ? getColumnSpan(columnSpan) : ''}>
	<GFform.Field {config} name={`input_${fieldId}`}>
		<GFform.Item>
			{#if label && showFieldLabel(labelPosition, 'above')}
				<GFform.Label>
					{label}
					{#if isRequired}
						{#if $formRequiredIndicator == 'asterisk'}
							<span class="text-red-600">*</span>
						{:else if $formRequiredIndicator == 'text'}
							<span class="text-muted-foreground text-xs"> (required)</span>
						{/if}
					{/if}
				</GFform.Label>
				{#if description && descriptionPosition == 'above'}
					<GFform.Description>{description}</GFform.Description>
				{/if}
				<GFform.Input value={defaultValue ?? undefined} placeholder={placeholder ?? ''} />
				{#if label && showFieldLabel(labelPosition, 'below')}
					<GFform.Description>{description}</GFform.Description>
				{/if}
			{/if}
			<GFform.Validation />
		</GFform.Item>
	</GFform.Field>
</div>
