<script lang="ts">
	import Form from './form/form.svelte';
	import type { Props } from './types.js';
	import { setCtx } from '../ctx.js';

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	type $$Props = Props;

	export let formId: $$Props['formId'] = undefined;

	const {
		// eslint-disable-next-line no-empty-pattern
		states: {},
		// eslint-disable-next-line no-empty-pattern
		methods: {},
		// eslint-disable-next-line no-empty-pattern
		options: {}
	} = setCtx({
		formId: formId
	});
</script>

<Form bind:formId />
