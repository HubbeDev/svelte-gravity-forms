<script lang="ts">
	import * as GFform from '$lib/components/index.js';
	import type { Props, InputEvents } from './index.js';
	import { getCtx } from '$lib/ctx.js';

	type $$Props = Props;
	type $$Events = InputEvents;

	export let fieldId: $$Props['fieldId'];
	export let label: $$Props['label'] = undefined;
	export let labelPosition: $$Props['labelPosition'] = undefined;
	export let description: $$Props['description'] = undefined;
	export let descriptionPosition: $$Props['descriptionPosition'] = undefined;
	export let isRequired: $$Props['isRequired'] = undefined;
	export let defaultValue: $$Props['defaultValue'] = undefined;
	export let placeholder: $$Props['placeholder'] = undefined;
	export let columnSpan: $$Props['columnSpan'] = undefined;
	export let index: $$Props['index'] = undefined;
	export let config: $$Props['config'];
	export let type: $$Props['type'] = undefined;

	const {
		helpers: { getColumnSpan, showFieldLabel, showDescription },
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
			{/if}

			{#if description && showDescription(descriptionPosition, 'above')}
				<GFform.Description>{description}</GFform.Description>
			{/if}

			{#if type === 'text'}
				<GFform.Input value={defaultValue ?? undefined} placeholder={placeholder ?? ''} />
			{:else if type === 'email'}
				<GFform.Input
					type="email"
					value={defaultValue ?? undefined}
					placeholder={placeholder ?? ''}
				/>
			{:else if type === 'textarea'}
				<GFform.Textarea value={defaultValue ?? undefined} placeholder={placeholder ?? ''} />
			{:else if type === 'select'}
				<GFform.Select>
					<GFform.SelectTrigger placeholder="Select a verified email to display" />
					<GFform.SelectContent>
						<GFform.SelectItem value="m@example.com">m@example.com</GFform.SelectItem>
						<GFform.SelectItem value="m@google.com">m@google.com</GFform.SelectItem>
						<GFform.SelectItem value="m@support.com">m@support.com</GFform.SelectItem>
					</GFform.SelectContent>
				</GFform.Select>
			{/if}

			{#if description && showDescription(descriptionPosition, 'below')}
				<GFform.Description>{description}</GFform.Description>
			{/if}

			<GFform.Validation />
		</GFform.Item>
	</GFform.Field>
</div>
