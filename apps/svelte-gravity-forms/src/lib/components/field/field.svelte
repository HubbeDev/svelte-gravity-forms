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
								<span class="text-muted-foreground text-xs"> (required)</span>
							{/if}
						{/if}
					</GFform.Label>
				{/if}

				{#if field.description && showDescription(field.descriptionPlacement, 'above')}
					<GFform.Description>{field.description}</GFform.Description>
				{/if}

				{#if field.type === 'text'}
					<GFform.Input
						value={field.defaultValue ?? undefined}
						placeholder={field.placeholder ?? ''}
					/>
				{:else if field.type === 'email'}
					<GFform.Input
						type="email"
						value={field.defaultValue ?? undefined}
						placeholder={field.placeholder ?? ''}
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
							<GFform.FormNativeSelect class="w-full">
								<option value="">{field.placeholder}</option>
								{#each field.choices as choice}
									<option value={choice.value}>{choice.text}</option>
								{/each}
							</GFform.FormNativeSelect>
						{/if}
					{/if}
				{/if}

				{#if field.description && showDescription(field.descriptionPlacement, 'below')}
					<GFform.Description>{field.description}</GFform.Description>
				{/if}

				<GFform.Validation />
			</GFform.Item>
		</GFform.Field>
	</div>
{/if}
