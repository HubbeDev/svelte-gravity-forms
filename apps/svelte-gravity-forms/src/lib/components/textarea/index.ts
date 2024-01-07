import Root from './textarea.svelte';
import { getFormField } from 'formsnap';
import type { Writable } from 'svelte/store';

export type TextareaGetFormField = Omit<ReturnType<typeof getFormField>, 'value'> & {
	value: Writable<string>;
};

export {
	Root,
	//
	Root as Textarea
};
