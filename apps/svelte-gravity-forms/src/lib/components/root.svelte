<script lang="ts">
	import { GFForm } from '$components/index.js';
	import type { Props } from './types.js';
	import { getCtx, setCtx } from '../ctx.js';

	type $$Props = Props;

	export let formId: $$Props['formId'] = undefined;

	setCtx({
		formId: formId
	});

	const {
		states: { formObject }
	} = getCtx();
</script>

<GFForm bind:formId />
<div class="max-w-lg bg-black p-2 text-left text-white">
	<pre>{JSON.stringify($formObject, null, 2)}</pre>
</div>
