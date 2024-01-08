import { Select as SelectPrimitive } from 'bits-ui';

import Root from './select-root.svelte';
import Select from './select.svelte';
import Label from './select-label.svelte';
import Item from './select-item.svelte';
import Content from './select-content.svelte';
import Trigger from './select-trigger.svelte';
import Separator from './select-separator.svelte';
import NativeSelect from './select-native.svelte';
import type { HTMLSelectAttributes } from 'svelte/elements';
import type { GFFieldChoiceProps } from '$lib/internal/types.js';

const Group = SelectPrimitive.Group;
const Input = SelectPrimitive.Input;
const Value = SelectPrimitive.Value;

type Props = HTMLSelectAttributes & {
	choices: GFFieldChoiceProps[];
	placeholder?: string;
};

export {
	Root,
	Item,
	Group,
	Input,
	Label,
	Value,
	Content,
	Trigger,
	Separator,
	type Props,
	NativeSelect,

	//
	Root as Select,
	Select as FormSelect,
	Item as SelectItem,
	Group as SelectGroup,
	Input as SelectInput,
	Label as SelectLabel,
	Value as SelectValue,
	Content as SelectContent,
	Trigger as SelectTrigger,
	Separator as SelectSeparator,
	type Props as SelectProps,
	NativeSelect as FormNativeSelect
};
