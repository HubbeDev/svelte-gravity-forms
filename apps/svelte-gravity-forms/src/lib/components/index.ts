import { Form as FormPrimitive } from 'formsnap';
/* import * as RadioGroupComp from '$lib/components/ui/radio-group/index.js';
import * as SelectComp from '$lib/components/ui/select/index.js'; */
import { Item } from '$components/item/index.js';
import { Input } from '$components/input/index.js';
import { Textarea } from '$components/textarea/index.js';
import { Description } from '$components/description/index.js';
import { Label } from '$components/label/index.js';
import { Validation } from '$components/validation/index.js';
import { FormField } from '$components/field/index.js';
import { Button } from '$components/button/index.js';
import {
	SelectContent,
	SelectLabel,
	SelectGroup,
	SelectItem,
	SelectSeparator,
	SelectTrigger,
	Select as FormSelect,
	SelectContent as FormSelectContent,
	SelectLabel as FormSelectLabel,
	SelectGroup as FormSelectGroup,
	SelectItem as FormSelectItem,
	SelectSeparator as FormSelectSeparator,
	SelectTrigger as FormSelectTrigger
} from '$components/select/index.js';

const Root = FormPrimitive.Root;
const Field = FormPrimitive.Field;
const Control = FormPrimitive.Control;

const NativeRadio = FormPrimitive.Radio;

export type Props = {
	formId?: number;
};

export {
	Root,
	Field,
	FormField,
	Control,
	Item,
	Input,
	Textarea,
	Label,
	Button,
	Validation,
	Description,
	NativeRadio,
	SelectContent,
	SelectLabel,
	SelectGroup,
	SelectItem,
	SelectSeparator,
	SelectTrigger,
	//
	Root as Form,
	Field as BitsField,
	FormField as GFFormField,
	Control as FormControl,
	Item as FormItem,
	Input as FormInput,
	Textarea as FormTextarea,
	Description as FormDescription,
	Label as FormLabel,
	Validation as FormValidation,
	NativeRadio as FormNativeRadio,
	Button as FormButton,
	FormSelect,
	FormSelectContent,
	FormSelectLabel,
	FormSelectGroup,
	FormSelectItem,
	FormSelectSeparator,
	FormSelectTrigger
};
