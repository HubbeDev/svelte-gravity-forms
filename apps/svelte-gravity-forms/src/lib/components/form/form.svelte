<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { GFButton } from '$components/index.js';
	import { superForm, superValidateSync } from 'sveltekit-superforms/client';

	import type { Props } from './types.js';
	import { getCtx } from '../../ctx.js';

	type $$Props = Props;

	export let formId: $$Props['formId'] = undefined;

	const {
		states: { formSchema },
		refs: { formRef }
	} = getCtx();

	const form = superForm(superValidateSync(formSchema), {
		SPA: true,
		validators: formSchema,
		onUpdate({ form }) {
			if (form.valid) {
				// TODO: Do something with the validated form.data
			}
		}
	});
</script>

{#if !formId}
	<p>Please provide a formId</p>
{:else}
	<Form.Root
		asChild
		method="POST"
		{form}
		controlled
		schema={formSchema}
		let:enhance
		let:attrs
		let:config
		{...$$restProps}
	>
		<form method="POST" bind:this={$formRef} use:enhance {...attrs}>
			<Form.Field {config} name="username">
				<Form.Item>
					<Form.Label>Username</Form.Label>
					<Form.Input />
					<Form.Description>This is your public display name.</Form.Description>
					<Form.Validation />
				</Form.Item>
			</Form.Field>
			<GFButton type="submit">Submit</GFButton>
		</form>
	</Form.Root>
{/if}
