<script lang="ts">
	import type { Props } from './types.js';
	import { setCtx } from '../ctx.js';
	import * as GFform from '$lib/components/form/index.js';
	import { GFButton } from '$components/index.js';
	import { superForm, superValidateSync } from 'sveltekit-superforms/client';

	type $$Props = Props;

	export let formId: $$Props['formId'] = undefined;

	const {
		methods: { onSubmitForm },
		helpers: { getColumnSpan, showFieldLabel },
		states: { formSchema, formFields, formRequiredIndicator, formObject },
		refs: { formRef }
	} = setCtx({
		formId: formId
	});

	$: form = $formSchema
		? superForm(superValidateSync($formSchema), {
				SPA: true,
				validators: $formSchema,
				// Reset the form upon a successful result
				applyAction: true,
				invalidateAll: true,
				resetForm: true,
				async onUpdate({ form }) {
					if (form.valid) {
						if (!form.data) return;
						await onSubmitForm(form.data);
					}
				}
			})
		: undefined;
</script>

{#if !form}
	<p>Please provide a formId</p>
{:else}
	<GFform.Root
		asChild
		method="POST"
		{form}
		controlled
		schema={$formSchema}
		let:enhance
		let:attrs
		let:config
		{...$$restProps}
	>
		<form
			class="grid w-full max-w-xl grid-cols-12 gap-x-6"
			method="POST"
			bind:this={$formRef}
			use:enhance
			{...attrs}
		>
			{#if $formFields}
				{#each $formFields as field, i}
					<div
						data-svelte-gf-field-id={i}
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
									{#if field.description && field.descriptionPlacement == 'above'}
										<GFform.Description>{field.description}</GFform.Description>
									{/if}
									<GFform.Input
										value={field.defaultValue ?? undefined}
										placeholder={field.placeholder ?? ''}
									/>
									{#if field.label && showFieldLabel(field.labelPlacement, 'below')}
										<GFform.Description>{field.description}</GFform.Description>
									{/if}
								{/if}
								<GFform.Validation />
							</GFform.Item>
						</GFform.Field>
					</div>
				{/each}
			{/if}
			<GFform.Button class="" size="lg" type="submit"></GFform.Button>
		</form>
	</GFform.Root>
{/if}

{#if $formObject}
	<div class="mt-6 max-w-lg bg-black p-2 text-left text-white">
		<pre>{JSON.stringify($formObject, null, 2)}</pre>
	</div>
{/if}
