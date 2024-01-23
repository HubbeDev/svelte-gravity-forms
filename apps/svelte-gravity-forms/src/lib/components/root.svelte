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
		//  'auto' | 'oninput' | 'onblur' | 'submit-only' = 'auto',
		validationMethod: 'oninput',
		//'keep' | 'clear' = 'keep',
		defaultValidator: 'clear',
		// Reset the form upon a successful result
		applyAction: true,
		invalidateAll: true,
		resetForm: true,
		taintedMessage: null,
		// On ActionResult> error, render the nearest +error.svelte pages
		onError: 'apply'
	};

	$: form = !ssr ? getSuperForm($formSchema) : form;
</script>

<GFform.Root {form} schema={$formSchema} {options} let:config debug={true}>
	<div class="w-full max-w-full grid-cols-12 gap-x-6 px-8 sm:grid sm:max-w-xl">
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
			<GFform.Button size="lg" type="submit"></GFform.Button>
		{/if}
	</div>
</GFform.Root>
