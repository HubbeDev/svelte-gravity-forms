import Root from './field.svelte';
import type { HTMLInputAttributes } from 'svelte/elements';
import type { SuperForm } from 'sveltekit-superforms/client';
import type { ZodValidation } from 'sveltekit-superforms';
import type { AnyZodObject } from 'zod';
import type { GFFieldProps } from '$lib/internal/types.js';

export type Form<T extends FormValidation> = {
	schema: T;
	form: SuperForm<T>;
};

export type Arrayable<T> = T | T[];

export type FormValidation = ZodValidation<AnyZodObject>;

type Props = HTMLInputAttributes & {
	config: Form<FormValidation>;
	field?: GFFieldProps;
	index?: number;
};

export {
	Root,
	type Props,
	//
	Root as FormField
};
