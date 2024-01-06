<script lang="ts">
	import * as Form from '$lib/components/ui/form/index.js';
	import { GFButton } from '$components/index.js';
	import { getCtx } from '../../ctx.js';
	import { superForm, superValidateSync } from 'sveltekit-superforms/client';

	const {
		methods: { onSubmitForm },
		helpers: { getFieldColSpan, showFieldLabel },
		states: { formSchema, formFields, formRequiredIndicator },
		refs: { formRef }
	} = getCtx();

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
	<Form.Root
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
					<div data-svelte-gf-field-id={i} class={getFieldColSpan(field)}>
						<Form.Field {config} name={`input_${field.id}`}>
							<Form.Item>
								{#if field.label && showFieldLabel(field.labelPlacement, 'above')}
									<Form.Label>
										{field.label}
										{#if field.isRequired}
											{#if $formRequiredIndicator == 'asterisk'}
												<span class="text-red-600">*</span>
											{:else if $formRequiredIndicator == 'text'}
												<span class="text-xs text-muted-foreground"> (required)</span>
											{/if}
										{/if}
									</Form.Label>
									{#if field.description && field.descriptionPlacement == 'above'}
										<Form.Description>{field.description}</Form.Description>
									{/if}
									<Form.Input
										value={field.defaultValue ?? undefined}
										placeholder={field.placeholder ?? ''}
									/>
									{#if field.label && showFieldLabel(field.labelPlacement, 'below')}
										<Form.Description>{field.description}</Form.Description>
									{/if}
								{/if}
								<Form.Validation />
							</Form.Item>
						</Form.Field>
					</div>
				{/each}
			{/if}
			<GFButton class="" size="lg" type="submit"></GFButton>
		</form>
	</Form.Root>
{/if}
