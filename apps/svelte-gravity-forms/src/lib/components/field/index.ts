import Root from './field.svelte';
import type { HTMLInputAttributes } from 'svelte/elements';
import type { InputEvents } from '../input/index.js';

type Props = HTMLInputAttributes & {
	fieldId?: number;
	label?: string;
	labelPosition?: string;
	description?: string;
	descriptionPosition?: string;
	isRequired?: boolean;
	defaultValue?: string;
	columnSpan?: number;
	placeholder?: string;
	config?: unknown;
	fieldIndex?: number;
};

export {
	Root,
	type Props,
	type InputEvents,
	//
	Root as FormField
};
