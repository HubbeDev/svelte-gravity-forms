import { createSvelteGravityFroms, type CreateGravityFromsProps } from '$lib/internal/gf.js';
import { getContext, setContext } from 'svelte';
import { getOptionUpdater } from '$lib/internal/helpers/options.js';

const GF_ROOT = Symbol('GF_ROOT');

export function setCtx(props: CreateGravityFromsProps = {}) {
	const GF = createSvelteGravityFroms(props);
	const updateOption = getOptionUpdater(GF.options);

	setContext(GF_ROOT, { ...GF, updateOption });

	return {
		...GF,
		updateOption
	};
}

export function getCtx() {
	return getContext<ReturnType<typeof setCtx>>(GF_ROOT);
}
