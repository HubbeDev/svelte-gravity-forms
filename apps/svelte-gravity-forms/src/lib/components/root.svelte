<script lang="ts">
	import * as GFform from '$lib/components/form/index.js';
	import type { Props } from './types.js';
	import { setCtx } from '../ctx.js';
	import type { SuperValidated } from 'sveltekit-superforms';

	type $$Props = Props;

	export let formId: $$Props['formId'] = undefined;
	export let backendUrl: $$Props['backendUrl'] = undefined;
	export let consumerKey: $$Props['consumerKey'] = undefined;
	export let consumerSecret: $$Props['consumerSecret'] = undefined;
	export let ssr: $$Props['ssr'] = true;
	export let form: $$Props['form'] = undefined;

	const {
		methods: { getClientSidesuperForm },
		states: { formSchema, formFields, formObject, isSubmitted, comfirmationText },
		refs: { formRef }
	} = setCtx({
		formId: formId,
		backendUrl: backendUrl,
		consumerKey: consumerKey,
		consumerSecret: consumerSecret,
		ssr: ssr,
		formObject: form
	});

	$: formData = $formSchema ? getClientSidesuperForm($formSchema) : undefined;
</script>

{#if !formData}
	<p>Please provide a formId</p>
{:else}
	<GFform.Root
		asChild
		method="POST"
		form={formData}
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
			{#if $isSubmitted}
				<div data-svelte-gf-confirmation class="col-span-12">
					{@html $comfirmationText}
				</div>
			{:else}
				{#if $formFields}
					{#each $formFields as field, i}
						<GFform.FormField
							type={field.type}
							index={i}
							label={field.label}
							labelPosition={field.labelPlacement}
							description={field.description}
							descriptionPosition={field.descriptionPlacement}
							fieldId={field.id}
							isRequired={field.isRequired}
							defaultValue={field.defaultValue}
							columnSpan={field.layoutGridColumnSpan}
							placeholder={field.placeholder}
							{config}
						/>
					{/each}
				{/if}
				<GFform.Button class="" size="lg" type="submit"></GFform.Button>
			{/if}
		</form>
	</GFform.Root>
{/if}

{#if $formObject}
	<div class="mt-6 max-w-lg bg-black p-2 text-left text-white">
		<pre>{JSON.stringify($formObject, null, 2)}</pre>
	</div>
{/if}
