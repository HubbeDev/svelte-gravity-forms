import { onMount } from 'svelte';
import { get, writable } from 'svelte/store';
import { type AnyZodObject } from 'zod';
import { effect, omit, removeUndefined, toWritableStores } from '$lib/internal/helpers/index.js';

import type { GFButtonProps, GFFieldProps, GFFormObjectProps } from './types.js';
import type { HTMLAttributes } from 'svelte/elements';
import { fetchGFForm, sendGFSubmission } from '../gf-rest.js';
import { generateFormSchema } from './helpers/schema.js';

export type CreateGravityFromsProps = {
	formId?: number | undefined;
	backendUrl?: string;
	consumerKey?: string;
	consumerSecret?: string;
	ssr?: boolean;
	schema?: AnyZodObject | undefined;
	formObject?: GFFormObjectProps;
};

const defaultProps = {
	formId: undefined,
	backendUrl: 'http://localhost:8888/wp-json/',
	formObject: undefined,
	consumerKey: undefined,
	consumerSecret: undefined,
	ssr: true,
	schema: undefined,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	form: undefined
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

	// @ts-expect-error Todo fix this type error
	const { formId, backendUrl, ssr } = options;

	// refs
	const formRef = writable<HTMLFormElement | undefined>(undefined);
	const submitButtonRef = writable<HTMLAttributes<HTMLButtonElement> | undefined>(undefined);

	// states

	const formFields = writable<GFFieldProps[]>(undefined);
	const formObject = writable(withDefaults.formObject);
	const formSchema = writable<AnyZodObject>();
	const formRequiredIndicator = writable<string | undefined>(undefined);
	const formSubmtiButton = writable<GFButtonProps | undefined>(undefined);
	const comfirmationText = writable<string>(undefined);
	const isSubmitted = writable<boolean>(false);

	const consumerKeyStore = writable(withDefaults.consumerKey);
	const consumerSecretStore = writable(withDefaults.consumerSecret);

	// Fetch form object from Gravity Forms API
	async function onClientSubmitForm(req: { [x: string]: unknown }) {
		try {
			// bail if ssr
			if (get(ssr)) return;

			const resp = await sendGFSubmission(req, get(backendUrl), get(formId));
			if (!resp.is_valid) {
				throw new Error(JSON.stringify(resp.validation_messages));
			}

			if (resp.confirmation_type === 'message' && resp.confirmation_message) {
				comfirmationText.set(resp.confirmation_message);
			}

			isSubmitted.set(resp.is_valid);
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
		if (!get(formId)) {
			return;
		}

		if (!get(ssr)) {
			const formData = await fetchGFForm(backendUrl, formId, consumerKeyStore, consumerSecretStore);
			formObject.set(formData);
		}
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
			const schema = generateFormSchema($formObject);
			formSchema.set(schema);
		}
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
			formId,
			formObject,
			formFields,
			formRequiredIndicator,
			formSubmtiButton,
			isSubmitted,
			comfirmationText,
			backendUrl
		},
		methods: {
			onClientSubmitForm
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
	};
}
