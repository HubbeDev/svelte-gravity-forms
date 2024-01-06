import { Form as FormPrimitive, getFormField } from 'formsnap';
import * as RadioGroupComp from '$lib/components/ui/radio-group/index.js';
import * as SelectComp from '$lib/components/ui/select/index.js';
import type { Writable } from 'svelte/store';
import { Item } from '$components/item/index.js';
import { Input } from '$components/input/index.js';
import { Description } from '$components/description/index.js';
import { Label } from '$components/label/index.js';
import { Validation } from '$components/validation/index.js';

import { Button } from '$components/button/index.js';

const Root = FormPrimitive.Root;
const Field = FormPrimitive.Field;
const Control = FormPrimitive.Control;
const RadioItem = RadioGroupComp.Item;
const NativeRadio = FormPrimitive.Radio;
const SelectContent = SelectComp.Content;
const SelectLabel = SelectComp.Label;
const SelectGroup = SelectComp.Group;
const SelectItem = SelectComp.Item;
const SelectSeparator = SelectComp.Separator;

export type TextareaGetFormField = Omit<ReturnType<typeof getFormField>, 'value'> & {
	value: Writable<string>;
};

export type Props = {
	formId?: number;
};

export {
	Root,
	Field,
	Control,
	Item,
	Input,
	Label,
	Button,
	Validation,
	RadioItem,
	Description,
	SelectContent,
	SelectLabel,
	SelectGroup,
	SelectItem,
	SelectSeparator,
	NativeRadio,
	//
	Root as Form,
	Field as FormField,
	Control as FormControl,
	Item as FormItem,
	Input as FormInput,
	Description as FormDescription,
	Label as FormLabel,
	Validation as FormValidation,
	NativeRadio as FormNativeRadio,
	RadioItem as FormRadioItem,
	SelectContent as FormSelectContent,
	SelectLabel as FormSelectLabel,
	SelectGroup as FormSelectGroup,
	SelectItem as FormSelectItem,
	SelectSeparator as FormSelectSeparator,
	Button as FormButton
};
