<script lang="ts">
	import * as Form from '$lib/components/ui/form/index.js';
	import { GFButton } from '$components/index.js';
	/* 	import type { Props } from './types.js'; */
	import { getCtx } from '../../ctx.js';
	import { superForm, superValidateSync } from 'sveltekit-superforms/client';

	/* 	type $$Props = Props;
	 */
	/* 	export let formId: $$Props['formId'] = undefined; */

	const {
		methods: { onSubmitForm, getFieldWidth },
		states: { formSchema, formFields },
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

<div class="max-w-xl">
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
				class="grid grid-cols-12 gap-6"
				method="POST"
				bind:this={$formRef}
				use:enhance
				{...attrs}
			>
				{#if $formFields}
					{#each $formFields as field}
						<div class={getFieldWidth(field)}>
							<Form.Field {config} name={`input_${field.id}`}>
								<Form.Item>
									<Form.Label>{field.label}</Form.Label>
									<Form.Input placeholder={field.placeholder ?? ''} />
									<Form.Description>{field.description}</Form.Description>
									<Form.Validation />
								</Form.Item>
							</Form.Field>
						</div>
					{/each}
				{/if}

				<GFButton type="submit">Submit</GFButton>
			</form>
		</Form.Root>
	{/if}
</div>
