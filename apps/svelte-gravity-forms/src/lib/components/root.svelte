<script lang="ts">
	import * as GFform from '$lib/components/index.js';
	import { type FormOptions } from 'formsnap';
	import type { Props } from './types.js';
	import { setCtx } from '../ctx.js';

	type $$Props = Props;

	export let formId: $$Props['formId'] = undefined;
	export let backendUrl: $$Props['backendUrl'] = undefined;
	export let consumerKey: $$Props['consumerKey'] = undefined;
	export let consumerSecret: $$Props['consumerSecret'] = undefined;
	export let ssr: $$Props['ssr'] = true;
	export let formData: $$Props['formData'] = undefined;
	export let form: $$Props['form'] = undefined;

	const {
		methods: { getSuperForm },
		states: { formSchema, formFields, formObject, isSubmitted, comfirmationText }
	} = setCtx({
		formId: formData ? formData.id : formId,
		backendUrl: backendUrl,
		consumerKey: consumerKey,
		consumerSecret: consumerSecret,
		ssr: ssr,
		formObject: formData
	});

	const options: FormOptions<typeof formSchema> = {
		SPA: ssr ? undefined : true,
		validators: $formSchema,
		// Reset the form upon a successful result
		applyAction: true,
		invalidateAll: true,
		resetForm: true,
		taintedMessage: null
	};

	$: form = !ssr ? getSuperForm($formSchema) : form;
	$: console.log($formSchema);
	$: console.log($formFields);
	$: console.log($formObject);
	$: console.log($isSubmitted);
	$: console.log($comfirmationText);
	$: console.log(form);
</script>

<GFform.Root {form} schema={$formSchema} {options} let:config debug={true}>
	<div class="grid w-full max-w-xl grid-cols-12 gap-x-6">
		<!-- <form method="POST" bind:this={$formRef} use:enhance {...attrs}> -->
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
					<fieldset>
						<legend>Select your theme</legend>
					</fieldset>
				{/each}
			{/if}
			<GFform.Button size="lg" type="submit"></GFform.Button>
		{/if}
	</div>
	<!-- 		</form> -->
</GFform.Root>

<!-- 
{#if $formObject}
	<div class="mt-6 max-w-lg bg-black p-2 text-left text-white">
		<pre>{JSON.stringify($formObject, null, 2)}</pre>
	</div>
{/if} -->
