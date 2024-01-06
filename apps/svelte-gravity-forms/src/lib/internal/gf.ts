import { onMount } from 'svelte';
import { get, writable } from 'svelte/store';
import { PUBLIC_GF_API_URL } from '$env/static/public';
import { z, type AnyZodObject } from 'zod';
import { effect, omit, removeUndefined, toWritableStores } from '$lib/internal/helpers/index.js';

import type { GFButtonProps, GFFieldsProps, GFFormObjectProps } from './types.js';
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

	// Create writable stores for the form options
	const options = toWritableStores(omit({ ...withDefaults }));

	// refs
	const formRef = writable<HTMLFormElement | undefined>(undefined);
	const submitButtonRef = writable<HTMLAttributes<HTMLButtonElement> | undefined>(undefined);

	// states
	const formObject = writable<GFFormObjectProps>(undefined);
	const formFields = writable<GFFieldsProps[]>(undefined);
	const formIdStore = writable(withDefaults.formId);
	const formSchema = writable<AnyZodObject>();
	const formRequiredIndicator = writable<string | undefined>(undefined);
	const formSubmtiButton = writable<GFButtonProps | undefined>(undefined);

	// Fetch form object from Gravity Forms API
	async function getFormObject(formId: number) {
		const res = await fetch(`${PUBLIC_GF_API_URL}/forms/${formId}`, { method: 'GET' });
		const data = (await res.json()) as GFFormObjectProps;
		return data;
	}

	// Handle form submission
	async function onSubmitForm(_formData: unknown) {
		//console.log('onSubmitForm', formData);
	}

	// Calculate column span for a field
	function getFieldColSpan(field: GFFieldsProps) {
		const layoutGridColumnSpan = Number(field.layoutGridColumnSpan);
		if (layoutGridColumnSpan >= 1 && layoutGridColumnSpan <= 12) {
			return `col-span-${layoutGridColumnSpan}`;
		}
	}

	// Calculate column span for a button
	// ! don't think this is needed anymore
	function getButtonColSpan(button: GFButtonProps) {
		const layoutGridColumnSpan = Number(button.layoutGridColumnSpan);
		if (layoutGridColumnSpan >= 1 && layoutGridColumnSpan <= 12) {
			return `col-span-${layoutGridColumnSpan}`;
		}
	}

	function getButtonWidth(button: GFButtonProps) {
		if (button.location) {
			if (button.location === 'inline') {
				return 'col-span-6';
			}
		}

		if (button.width) {
			if (button.width === 'full') {
				return 'col-span-12';
			}
			if (button.width === 'auto') {
				return 'w-auto';
			}
		}
		return 'col-span-12';
	}

	// Determine whether to show field label
	function showFieldLabel(fieldLabelPlacement: string | undefined, position = 'above') {
		const formData = get(formObject);

		if (fieldLabelPlacement === 'hidden_label') {
			return false;
		}
		if (fieldLabelPlacement === '') {
			const formDefaultLabelPlacement = formData?.labelPlacement;
			let defaultPos = 'top_label';
			if (position === 'above') {
				defaultPos = 'top_label';
			}
			if (position === 'left') {
				defaultPos = 'left_label';
			}
			if (position === 'right') {
				defaultPos = 'right_label';
			}
			return formDefaultLabelPlacement === defaultPos;
		}

		return fieldLabelPlacement === position;
	}

	// Fetch and set form object on mount
	onMount(async () => {
		if (!get(formIdStore)) {
			return;
		}
		const formData = await getFormObject(get(formIdStore));
		formObject.set(formData);
	});

	/**
	 * Set form fields on mount if exists in form object data
	 */
	effect([formObject], ([$formObject]) => {
		if ($formObject) {
			if (!$formObject.fields) {
				return;
			}
			formFields.set($formObject.fields);
		}
	});

	// Set form schema
	effect([formFields], ([$formFields]) => {
		if (!$formFields) {
			return;
		}
		const fieldsForSchema = $formFields.map((field) => {
			const name = `input_${field.id}`;

			let fieldType = z.string();
			if (field.isRequired) {
				fieldType = fieldType.min(1, `${field.label} is required`);
			}
			if (field.maxLength && Number(field.maxLength) > 0) {
				fieldType = fieldType.max(
					Number(field.maxLength),
					`${field.label} is too long (max ${field.maxLength} characters)`
				);
			}

			return {
				name,
				fieldType: fieldType
			};
		});

		const schema = z.object(
			Object.fromEntries(fieldsForSchema.map((field) => [field.name, field.fieldType]))
		);

		formSchema.set(schema);
	});

	// Set submit button on mount if exists in form object data
	effect([formObject], ([$formObject]) => {
		if ($formObject) {
			if (!$formObject.button) {
				return;
			}
			if ($formObject.button) {
				formSubmtiButton.set($formObject.button);
			}
		}
	});

	// Set required indicator on mount if exists in form object data
	effect([formObject], ([$formObject]) => {
		if ($formObject) {
			if ($formObject.requiredIndicator) {
				formRequiredIndicator.set($formObject.requiredIndicator);
			}
		}
	});

	return {
		states: {
			formSchema,
			formIdStore,
			formObject,
			formFields,
			formRequiredIndicator,
			formSubmtiButton
		},
		methods: {
			onSubmitForm
		},
		helpers: {
			getFieldColSpan,
			getButtonColSpan,
			showFieldLabel,
			getButtonWidth
		},
		refs: {
			formRef,
			submitButtonRef
		},
		options
		// Your methods here
	};
}
