import { onMount } from 'svelte';
import { get, writable, type Writable } from 'svelte/store';
import { PUBLIC_GF_API_URL } from '$env/static/public';
import { z, type AnyZodObject } from 'zod';
import { omit, removeUndefined, toWritableStores } from '$lib/internal/helpers/index.js';

import type { GFFieldsProps, GFFormObjectProps } from './types.js';
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
	const formObject = writable<GFFormObjectProps>(undefined);
	const formFields = writable<GFFieldsProps[]>(undefined);
	const formIdStore = writable(withDefaults.formId);
	const formSchema = writable<AnyZodObject>();

	/**
	 *  Get form object from Gravity Forms API
	 */
	async function getFormObject(formId: number) {
		const res = await fetch(`${PUBLIC_GF_API_URL}/forms/${formId}`, {
			method: 'GET'
		});

		const data = (await res.json()) as GFFormObjectProps;
		return data;
	}

	async function onSubmitForm(formData: unknown) {
		console.log('onSubmitForm', formData);
	}

	/**
	 * Set form object on mount
	 */
	onMount(async () => {
		if (!get(formIdStore)) {
			return;
		}
		const formData = await getFormObject(get(formIdStore));
		formObject.set(formData);

		if (formData && formData.fields) {
			formFields.set(formData.fields);

			const fieldsForSchema = formData.fields.map((field) => {
				console.log('field', field);
				const name = `input_${field.id}`;

				let fieldType = z.string();
				if (field.isRequired) {
					fieldType = fieldType.min(1, 'This field is required');
				}
				if (field.maxLength) {
					fieldType = fieldType.max(Number(field.maxLength));
				}

				return {
					name,
					fieldType: z.string().min(3).max(10)
				};
			});

			const schema = z.object(
				Object.fromEntries(fieldsForSchema.map((field) => [field.name, field.fieldType]))
			);

			formSchema.set(schema);
		}
	});

	return {
		states: {
			formSchema,
			formIdStore,
			formObject,
			formFields
		},
		methods: {
			onSubmitForm
		},
		refs: {
			formRef,
			submitButtonRef
		},
		options
		// Your methods here
	};
}
