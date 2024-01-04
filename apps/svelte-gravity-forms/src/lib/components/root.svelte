<script lang="ts">
	import { GFForm, GFButton } from '$components/index.js';
	import type { Props } from './types.js';
	import { setCtx } from '../ctx.js';

	type $$Props = Props;

	export let formId: $$Props['formId'] = undefined;

	const {
		// eslint-disable-next-line no-empty-pattern
		states: {},
		// eslint-disable-next-line no-empty-pattern
		methods: {},
		// eslint-disable-next-line no-empty-pattern
		options: {},
		refs: { formRef }
	} = setCtx({
		formId: formId
	});
</script>

<GFForm bind:formId />
