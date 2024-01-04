import { onMount } from 'svelte';
import { get, writable } from 'svelte/store';
import { PUBLIC_GF_API_URL } from '$env/static/public';
import { z } from 'zod';
import { effect, omit, removeUndefined, toWritableStores } from '$lib/internal/helpers/index.js';
import { superForm, superValidateSync } from 'sveltekit-superforms/client';
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

	/**
	 *  Get form object from Gravity Forms API
	 */
	async function getFormObject() {
		const res = await fetch(`${PUBLIC_GF_API_URL}/forms/1`, {
			method: 'GET'
		});

		const data = (await res.json()) as GFFormObjectProps;
		return data;
	}

	async function setFormFields(formObject: GFFormObjectProps) {
		const fields = formObject.fields;
		if (!fields) return;
		formFields.set(fields);
	}

	async function onSubmitForm(formData: unknown) {
		console.log('onSubmitForm', formData);
	}

	/**
	 * Set form object on mount
	 */
	onMount(async () => {
		if (!get(formRef)) return;
		const formData = await getFormObject();
		console.log('formData', formData);
		formObject.set(formData);
		await setFormFields(formData);
	});

	effect([formObject], ([$formObject]) => {
		console.log('formObject', $formObject);
		if ($formObject && $formObject.fields) {
			formFields.set($formObject.fields);
		}
	});

	/**
	 * TODO: Create a form schema from the form fields
	 */

	const formSchema = writable(
		z.object({
			test: z.string().min(3).max(10)
		})
	);
	/* effect([formFields], ([$formFields]) => {
		console.log('formFields', $formFields);
		if ($formFields) {
			const fieldsObject = $formFields.reduce((obj, field) => {
				return {
					...obj,
					[field.label]: z.string().min(3).max(10)
				};
			}, {});

			formSchema.set(z.object(fieldsObject));
		}
	});
 */
	/* effect([formSchema], ([$formSchema]) => {
		console.log('form§Schema', $formSchema);
	}); */

	const validatedForm = writable(
		superForm(superValidateSync(get(formSchema)), {
			SPA: true,
			validators: get(formSchema),
			// Reset the form upon a successful result
			resetForm: true,
			async onUpdate({ form }) {
				if (form.valid) {
					/* 	console.log('form', form); */
					if (!form.data) return console.log('no data');
					await onSubmitForm(form.data);
				}
			}
		})
	);

	return {
		states: {
			formSchema,
			formIdStore,
			formObject,
			formFields,
			validatedForm
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
