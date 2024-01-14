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
				fieldType = z.number().int(); // Make sure it's an integer

				if (field.rangeMin) {
					fieldType = fieldType.gte(Number(field.rangeMin));
				}
				if (field.rangeMax) {
					fieldType = fieldType.lte(Number(field.rangeMax));
				}

				fieldType = fieldType.default(Number(field.rangeMin));

				break;
			case 'email':
				fieldType = z.string().email();
				if (field.isRequired) {
					fieldType = fieldType.nonempty();
				}

				break;
			default:
				fieldType = z.string();
				break;
		}

		if (field.isRequired && fieldType instanceof z.ZodString) {
			fieldType = fieldType.min(1, `${field.label} is required`);
		}

		if (field.maxLength && fieldType instanceof z.ZodString) {
			fieldType = fieldType.max(Number(field.maxLength));
		}

		/* if (field.maxLength && Number(field.maxLength) > 0) {
			fieldType = fieldType.max(
				Number(field.maxLength),
				`${field.label} is too long (max ${field.maxLength} characters)`
			);
		} */

		/* if (field.rangeMin && Number(field.rangeMin) > 0) {
			fieldType = fieldType.min(
				Number(field.rangeMin),
				`${field.label} is too low (min ${field.rangeMin})`
			);
		} */

		/* 		if (field.rangeMax) {
			fieldType = fieldType.max(10, `${field.label} is too high (max 10)`);
		} */

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
