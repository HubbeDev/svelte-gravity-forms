<script lang="ts">
	import * as GFform from '$lib/components/index.js';
	import type { Props } from './types.js';
	import { setCtx } from '../ctx.js';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';

	type $$Props = Props;

	export let formId: $$Props['formId'] = undefined;
	export let backendUrl: $$Props['backendUrl'] = undefined;
	export let consumerKey: $$Props['consumerKey'] = undefined;
	export let consumerSecret: $$Props['consumerSecret'] = undefined;
	export let ssr: $$Props['ssr'] = true;
	export let formData: $$Props['formData'] = undefined;

	const {
		methods: { getSuperForm },
		states: { formSchema, formFields, formObject, isSubmitted, comfirmationText },
		refs: { formRef }
	} = setCtx({
		formId: formData ? formData.id : formId,
		backendUrl: backendUrl,
		consumerKey: consumerKey,
		consumerSecret: consumerSecret,
		ssr: ssr,
		formObject: formData
	});

	$: superForm = $formSchema ? getSuperForm($formSchema) : undefined;
</script>

{#if !superForm}
	<p>Please provide a formId</p>
{:else}
	<SuperDebug data={superForm} />
	<GFform.Root
		asChild
		method="POST"
		form={superForm}
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
				<div class="col-span-12 mb-4">
					<h3 class="mb-2 text-3xl font-bold">{$formObject.title}</h3>
					<p class="text-base">{$formObject.description}</p>
				</div>
				{#if $formFields}
					{#each $formFields as field, i}
						<GFform.FormField {field} index={i} {config} />
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
