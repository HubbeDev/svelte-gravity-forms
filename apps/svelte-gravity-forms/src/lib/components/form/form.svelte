<script lang="ts">
	import * as Form from '$lib/components/ui/form/index.js';
	import { GFButton } from '$components/index.js';

	import type { Props } from './types.js';
	import { getCtx } from '../../ctx.js';

	type $$Props = Props;

	export let formId: $$Props['formId'] = undefined;

	const {
		methods: { onSubmitForm },
		states: { formSchema, formFields, validatedForm },
		refs: { formRef }
	} = getCtx();

	$: console.log({ $formSchema, $formFields, $validatedForm });
</script>

{#if !validatedForm}
	<p>Please provide a formId</p>
{:else}
	<Form.Root
		asChild
		method="POST"
		form={$validatedForm}
		controlled
		schema={$formSchema}
		let:enhance
		let:attrs
		let:config
		{...$$restProps}
	>
		<form method="POST" bind:this={$formRef} use:enhance {...attrs}>
			{#if $formFields}
				{#each $formFields as field}
					<Form.Field {config} name="test">
						<Form.Item>
							<Form.Label>{field.label}</Form.Label>
							<Form.Input placeholder={field.placeholder ?? ''} />
							<Form.Description>{field.description}</Form.Description>
							<Form.Validation />
						</Form.Item>
					</Form.Field>
				{/each}
			{/if}

			<!-- <Form.Field {config} name="username">
				<Form.Item>
					<Form.Label>Username</Form.Label>
					<Form.Input />
					<Form.Description>This is your public display name.</Form.Description>
					<Form.Validation />
				</Form.Item>
			</Form.Field> -->
			<GFButton type="submit">Submit</GFButton>
		</form>
	</Form.Root>
{/if}
