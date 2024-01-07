import Root from './field.svelte';
import type { HTMLInputAttributes } from 'svelte/elements';
import type { InputEvents } from '../input/index.js';
import type { SuperForm } from 'sveltekit-superforms/client';
import type { ZodValidation } from 'sveltekit-superforms';
import type { AnyZodObject } from 'zod';

export type Form<T extends FormValidation> = {
	schema: T;
	form: SuperForm<T>;
};

export type Arrayable<T> = T | T[];

export type FormValidation = ZodValidation<AnyZodObject>;

type Props = HTMLInputAttributes & {
	fieldId: number;
	config: Form<FormValidation>;
	label?: string;
	labelPosition?: string;
	description?: string;
	descriptionPosition?: string;
	isRequired?: boolean;
	defaultValue?: string;
	columnSpan?: number;
	placeholder?: string;
	index?: number;
	type?: string;
};

export {
	Root,
	type Props,
	type InputEvents,
	//
	Root as FormField
};