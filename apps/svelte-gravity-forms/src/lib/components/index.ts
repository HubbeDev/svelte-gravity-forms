import { Form as FormPrimitive } from 'formsnap';
/* import * as RadioGroupComp from '$lib/components/ui/radio-group/index.js';
import * as SelectComp from '$lib/components/ui/select/index.js'; */
import { Item } from '$components/item/index.js';
import { Input } from '$components/input/index.js';
import { NumberInput } from '$components/number/index.js';
import { Textarea } from '$components/textarea/index.js';
import { Description } from '$components/description/index.js';
import { Label } from '$components/label/index.js';
import { Validation } from '$components/validation/index.js';
import { FormField } from '$components/field/index.js';
import { Button } from '$components/button/index.js';
import { FormSelect as Select } from '$components/select/index.js';
import { NativeSelect } from '$components/select/index.js';

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
	Select,
	NativeSelect,
	NumberInput,
	//
	Root as Form
};
