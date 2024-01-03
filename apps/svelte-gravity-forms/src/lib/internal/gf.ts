import { effect, omit, removeUndefined, toWritableStores } from '$lib/internal/helpers/index.js';
import { onMount } from 'svelte';
import { get, writable } from 'svelte/store';
import {
	PUBLIC_GF_CONSUMER_KEY,
	PUBLIC_GF_CONSUMER_SECRECT,
	PUBLIC_GF_API_URL
} from '$env/static/public';

export type CreateGravityFromsProps = {
	formId?: number;
};

const defaultProps = {
	formId: undefined
};

export function createSvelteGravityFroms(props: CreateGravityFromsProps) {
	const { ...withDefaults } = {
		...defaultProps,
		...removeUndefined(props)
	} satisfies CreateGravityFromsProps;

	const options = toWritableStores(
		omit(
			{
				...withDefaults
			}
			//...omittedOptions
		)
	);

	const formRef = writable<HTMLFormElement | undefined>(undefined);
	const formObject = writable<any>(undefined);

	onMount(async () => {
		if (!get(formRef)) return;

		const form = await getFormObject();
		formObject.set(form);
	});

	async function getFormObject(): Promise<any> {
		const res = await fetch(`${PUBLIC_GF_API_URL}forms?include[]=31`, {
			method: 'GET',
			headers: {
				Authorization: 'Basic ' + btoa(`${PUBLIC_GF_CONSUMER_KEY}:${PUBLIC_GF_CONSUMER_SECRECT}`)
			}
		});

		const data = await res.json();
		return data;
	}

	return {
		states: {},
		methods: {
			getFormObject
		},
		refs: {
			formRef
		},
		options
		// Your methods here
	};
}
