import { z, type AnyZodObject } from 'zod';
import type { GFFormObjectProps } from '../types.js';

export function generateFormSchema(formObject: GFFormObjectProps) {
	const formFields = formObject.fields;
	if (!formFields) return {} as AnyZodObject;

	const fieldsForSchema = formFields.map((field) => {
		const name = `input_${field.id}`;

		let fieldType;

		switch (field.type) {
			case 'text':
				fieldType = z.string();
				break;
			case 'textarea':
				fieldType = z.string();
				break;
			case 'number':
				fieldType = z.string();
				break;
			case 'email':
				fieldType = z.string().email();
				break;
			default:
				fieldType = z.string();
				break;
		}

		if (field.isRequired) {
			fieldType = fieldType.min(1, `${field.label} is required`);
		}

		if (field.maxLength && Number(field.maxLength) > 0) {
			fieldType = fieldType.max(
				Number(field.maxLength),
				`${field.label} is too long (max ${field.maxLength} characters)`
			);
		}

		if (field.rangeMin && Number(field.rangeMin) > 0) {
			fieldType = fieldType.min(
				Number(field.rangeMin),
				`${field.label} is too low (min ${field.rangeMin})`
			);
		}

		if (field.rangeMax && Number(field.rangeMax) > 0) {
			fieldType = fieldType.max(
				Number(field.rangeMax),
				`${field.label} is too high (max ${field.rangeMax})`
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

	return schema;
}
