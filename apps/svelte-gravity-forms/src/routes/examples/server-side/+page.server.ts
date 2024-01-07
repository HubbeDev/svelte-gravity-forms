import { getGFFormData } from '$lib/internal/helpers/gf-rest.js';
import { GF_API_URL, GF_CONSUMER_KEY, GF_CONSUMER_SECRECT } from '$env/static/private';
import { generateFormSchema } from '$lib/internal/helpers/schema.js';
import { superValidate } from 'sveltekit-superforms/server';

export const load = async () => {
	const formObject = await getGFFormData(GF_API_URL, 1, GF_CONSUMER_KEY, GF_CONSUMER_SECRECT);
	/* const schema = generateFormSchema(formObject); */
	return {
		form: formObject
	};
};
