<script lang="ts">
	import { GFForm } from '$components/index.js';
	import type { Props } from './types.js';
	import { setCtx } from '../ctx.js';

	type $$Props = Props;

	export let formId: $$Props['formId'] = undefined;

	setCtx({
		formId: formId
	});
</script>

<GFForm bind:formId />
