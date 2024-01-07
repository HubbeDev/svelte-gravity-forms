import { onMount } from 'svelte';
import { get, writable } from 'svelte/store';
import { z, type AnyZodObject } from 'zod';
import { effect, omit, removeUndefined, toWritableStores } from '$lib/internal/helpers/index.js';

import type {
	GFButtonProps,
	GFComfirmationProps,
	GFFieldsProps,
	GFFormObjectProps
} from './types.js';
import type { HTMLAttributes } from 'svelte/elements';
import { getFormObject, sendSubmission } from './helpers/gf-rest.js';

export type CreateGravityFromsProps = {
	formId?: number | undefined;
	backendUrl?: string;
	formUrl?: string;
};

const defaultProps = {
	formId: undefined,
	backendUrl: 'http://localhost:8888/wp-json',
	formUrl: 'svelte-gravityforms/v1/gf'
};

export function createSvelteGravityFroms(props: CreateGravityFromsProps) {
	const { ...withDefaults } = {
		...defaultProps,
		...removeUndefined(props)
	} satisfies CreateGravityFromsProps;

	// Create writable stores for the form options
	const options = toWritableStores(
		omit({
			...withDefaults
		})
	);

	const { formId, backendUrl, formUrl } = options;

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
	const defaultConfirmation = writable<GFComfirmationProps>(undefined);
	const isSubmitted = writable<boolean>(false);

	// Fetch form object from Gravity Forms API

	// Handle form submission
	async function onSubmitForm(req: { [x: string]: unknown }) {
		try {
			const submit = await sendSubmission(req, backendUrl, formId);

			if (!submit.is_valid) {
				throw new Error(submit.message);
			}

			isSubmitted.set(true);
		} catch (err) {
			// eslint-disable-next-line no-console
			console.error(err);
		}
	}

	// Calculate column span for a field
	function getColumnSpan(columnSpan: number | undefined) {
		if (!columnSpan) {
			return 'col-span-12';
		}
		switch (columnSpan) {
			case 1:
				return 'col-span-1';
			case 2:
				return 'col-span-2';
			case 3:
				return 'col-span-3';
			case 4:
				return 'col-span-4';
			case 5:
				return 'col-span-5';
			case 6:
				return 'col-span-6';
			case 7:
				return 'col-span-7';
			case 8:
				return 'col-span-8';
			case 9:
				return 'col-span-9';
			case 10:
				return 'col-span-10';
			case 11:
				return 'col-span-11';
			case 12:
				return 'col-span-12';
			default:
				return 'col-span-12';
		}
	}

	function getButtonWidth(button: GFButtonProps) {
		if (button.location) {
			if (button.location === 'inline') {
				if (button.layoutGridColumnSpan) {
					return getColumnSpan(button.layoutGridColumnSpan);
				}
				return 'col-span-12';
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

	// Determines whether to show the field label based on the field label placement.
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

	/**
	 * Determines whether to show the description based on the field description placement.
	 */
	function showDescription(
		fieldDescriptionPlacement: string | undefined,
		position = 'above'
	): boolean {
		const formData = get(formObject);
		const defaultPlacement = formData?.descriptionPlacement;

		// Use the default placement if fieldDescriptionPlacement is an empty string
		fieldDescriptionPlacement =
			fieldDescriptionPlacement === '' ? defaultPlacement : fieldDescriptionPlacement;

		// Return true if the field description placement matches the position
		return fieldDescriptionPlacement === position;
	}

	// Fetch and set form object on mount
	onMount(async () => {
		if (!get(formIdStore)) {
			return;
		}
		const formData = await getFormObject(backendUrl, formUrl, formIdStore);
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

	/**
	 * set default confirmation on mount if exists in form object data
	 */
	effect([formObject], ([$formObject]) => {
		if ($formObject) {
			if (!$formObject.confirmations) {
				return;
			}

			// find default confirmation by isDefault key
			const defaultConfirmationObject = Object.values($formObject.confirmations).find(
				(confirmation) => confirmation.isDefault
			);

			if (!defaultConfirmationObject) {
				return;
			}

			defaultConfirmation.set(defaultConfirmationObject);
		}
	});

	// Set form schema
	effect([formFields], ([$formFields]) => {
		if (!$formFields) {
			return;
		}

		const fieldsForSchema = $formFields.map((field) => {
			const name = `input_${field.id}`;

			let fieldType;

			switch (field.type) {
				case 'text':
					fieldType = z.string();
					break;
				case 'textarea':
					fieldType = z.string();
					break;
				default:
					fieldType = z.string();
					break;
			}

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
			formSubmtiButton,
			isSubmitted,
			defaultConfirmation,
			formId,
			backendUrl,
			formUrl
		},
		methods: {
			onSubmitForm
		},
		helpers: {
			getColumnSpan,
			showFieldLabel,
			getButtonWidth,
			showDescription
		},
		refs: {
			formRef,
			submitButtonRef
		},
		options
		// Your methods here
	};
}
