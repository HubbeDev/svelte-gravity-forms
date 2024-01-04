import { onMount } from 'svelte';
import { get, writable } from 'svelte/store';
import { PUBLIC_GF_API_URL } from '$env/static/public';
import { z } from 'zod';
import { omit, removeUndefined, toWritableStores } from '$lib/internal/helpers/index.js';

import type { GravityFormsFormObjectProps } from './types.js';
import type { HTMLAttributes } from 'svelte/elements';

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

	// refs
	const formRef = writable<HTMLFormElement | undefined>(undefined);
	const submitButtonRef = writable<HTMLAttributes<HTMLButtonElement> | undefined>(undefined);

	// states
	const formObject = writable<GravityFormsFormObjectProps>(undefined);
	const formFields = writable<any[]>(undefined);
	const formIdStore = writable(withDefaults.formId);

	const formSchema = z.object({
		username: z.string().min(2).max(50)
	});
	const formSchemaStore = writable(formSchema);

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
	function getFormFields() {
		const form = get(formObject);
		const fields = form.fields;
		if (!fields) return;
		return fields;
	}

	/* 	function transformFormFields() {
		const formFields = getFormFields();
	} */

	/**
	 * Set form object on mount
	 */
	onMount(async () => {
		if (!get(formRef)) return;
		const formObject = await getFormObject();

		await setFormFields(formObject);
	});

	return {
		states: {
			formSchema,
			formIdStore,
			formObject,
			formFields
		},
		methods: {},
		refs: {
			formRef,
			submitButtonRef
		},
		options
		// Your methods here
	};
}
