<script lang="ts">
	import * as GFform from '$lib/components/index.js';
	import type { Props } from './index.js';
	import { getCtx } from '$lib/ctx.js';

	type $$Props = Props;

	export let field: $$Props['field'] = undefined;
	export let index: $$Props['index'] = undefined;
	export let config: $$Props['config'];

	const {
		helpers: { getColumnSpan, showFieldLabel, showDescription },
		states: { formRequiredIndicator }
	} = getCtx();

	/* 	export { className as class }; */
</script>

{#if field}
	<div
		data-svelte-gf-field-id={index}
		data-svelte-gf-field-type={field.type}
		class={field.layoutGridColumnSpan ? getColumnSpan(field.layoutGridColumnSpan) : ''}
	>
		<GFform.Field {config} name={`input_${field.id}`}>
			<GFform.Item>
				{#if field.label && showFieldLabel(field.labelPlacement, 'above')}
					<GFform.Label>
						{field.label}
						{#if field.isRequired}
							{#if $formRequiredIndicator == 'asterisk'}
								<span class="text-red-600">*</span>
							{:else if $formRequiredIndicator == 'text'}
								<span class="text-xs text-muted-foreground"> (required)</span>
							{/if}
						{/if}
					</GFform.Label>
				{/if}

				{#if field.description && showDescription(field.descriptionPlacement, 'above')}
					<GFform.Description>{field.description}</GFform.Description>
				{/if}

				{#if field.type === 'text'}
					<GFform.Input />
				{:else if field.type === 'email'}
					<GFform.Input
						type="email"
						value={field.defaultValue == '' ? null : field.defaultValue}
						placeholder={field.placeholder ?? ''}
					/>
				{:else if field.type === 'number'}
					<GFform.NumberInput
						value={field.defaultValue == '' ? undefined : field.defaultValue}
						placeholder={field.placeholder ?? ''}
						numberFormat={field.numberFormat}
					/>
				{:else if field.type === 'textarea'}
					<GFform.Textarea
						value={field.defaultValue ?? undefined}
						placeholder={field.placeholder ?? ''}
					/>
				{:else if field.type === 'select'}
					{#if field.choices}
						{#if field.enableEnhancedUI}
							<GFform.Select choices={field.choices} placeholder={field.placeholder} />
						{:else}
							<GFform.NativeSelect>
								<option value="">{field.placeholder}</option>
								{#each field.choices as choice}
									<option value={choice.value}>{choice.text}</option>
								{/each}
							</GFform.NativeSelect>
						{/if}
					{/if}
				{/if}

				{#if field.description && showDescription(field.descriptionPlacement, 'below')}
					<GFform.Description>{field.description}</GFform.Description>
				{/if}
				{#if field.type === 'number'}
					<GFform.Description>
						Please enter a number from {field.rangeMin} to {field.rangeMax}.
					</GFform.Description>
				{/if}

				<GFform.Validation />
			</GFform.Item>
		</GFform.Field>
	</div>
{/if}
