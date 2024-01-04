import { effect, omit, removeUndefined, toWritableStores } from '$lib/internal/helpers/index.js';
import { onMount } from 'svelte';
import { get, writable } from 'svelte/store';
import { PUBLIC_GF_API_URL } from '$env/static/public';
import type { GravityFormsFormObjectProps } from './types.js';

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
	const formObject = writable<GravityFormsFormObjectProps>(undefined);
	const formFields = writable<any[]>(undefined);
	const formIdStore = writable(withDefaults.formId);

	/**
	 *  Get form object from Gravity Forms API
	 */
	async function getFormObject() {
		const res = await fetch(`${PUBLIC_GF_API_URL}/forms/1`, {
			method: 'GET'
		});

		const data = (await res.json()) as GravityFormsFormObjectProps;
		return data;
	}

	async function setFormFields(formObject: GravityFormsFormObjectProps) {
		const fields = formObject.fields;
		if (!fields) return;
		formFields.set(fields);
	}

	/**
	 * Get form object from Gravity Forms API
	 */
	/* 	function getFormFields() {
		const form = get(formObject);
		const fields = form.fields;
		if (!fields) return;
		return fields;
	}
 */
	/* function transformFormFields() {
		const formFields = getFormFields();
	} */

	/**
	 * Set form object on mount
	 */
	onMount(async () => {
		if (!get(formRef)) return;
		const formObject = await getFormObject();
		console.log(formObject);
		await setFormFields(formObject);
	});

	return {
		states: {
			formIdStore,
			formObject,
			formFields
		},
		methods: {},
		refs: {
			formRef
		},
		options
		// Your methods here
	};
}
