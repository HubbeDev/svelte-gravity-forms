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
	const formRequiredIndicator = writable<string>(undefined);

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

	function getFieldColSpan(field: GFFieldsProps) {
		const layoutGridColumnSpan = Number(field.layoutGridColumnSpan);
		if (layoutGridColumnSpan >= 1 && layoutGridColumnSpan <= 12) {
			return `col-span-${layoutGridColumnSpan}`;
		}
	}

	function getButtonColSpan(formObject: GFFormObjectProps, buttonID: string | undefined) {
		if (!buttonID) {
			return;
		}

		const buttons = formObject.button || [];
		const button = buttons.find((button) => button.id === buttonID);
		if (!button) {
			return;
		}

		const layoutGridColumnSpan = Number(button.layoutGridColumnSpan);
		if (layoutGridColumnSpan >= 1 && layoutGridColumnSpan <= 12) {
			return `col-span-${layoutGridColumnSpan}`;
		}
	}

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
	 *  Get required indicator type from form object
	 *  TODO: add support for custom text
	 */
	/* function getRequiredIndicatorType(): string {
		const formData = get(formObject);
		if (!formData || !formData.requiredIndicator) {
			return;
		}
		return formData.requiredIndicator;
	} */

	/* function getButtonWidth(formObject: GFFormObjectProps, buttonID: string | undefined) {
		if (!buttonID) {
			return;
		}

		const buttons = formObject.button || [];
		const button = buttons.find((button) => button.id === buttonID);
		if (!button) {
			return;
		}

		return 'w-' + button.width;
	}
 */
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
			formRequiredIndicator.set(formData.requiredIndicator);
			console.log('formData', formData);
			const fieldsForSchema = formData.fields.map((field) => {
				const name = `input_${field.id}`;
				console.log('name', name);
				console.log('field', field);

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
		}
	});

	return {
		states: {
			formSchema,
			formIdStore,
			formObject,
			formFields,
			formRequiredIndicator
		},
		methods: {
			onSubmitForm
		},
		helpers: {
			getFieldColSpan,
			getButtonColSpan,
			showFieldLabel
			/* 			getRequiredIndicatorType */
			/* 			getButtonWidth */
		},
		refs: {
			formRef,
			submitButtonRef
		},
		options
		// Your methods here
	};
}
