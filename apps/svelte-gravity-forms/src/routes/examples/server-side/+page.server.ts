import { getGFFormData, sendGFSubmission } from '$lib/server/index.js';
import { GF_API_URL, GF_CONSUMER_KEY, GF_CONSUMER_SECRECT } from '$env/static/private';
import { superValidate } from 'sveltekit-superforms/server';
import { fail } from '@sveltejs/kit';

export const load = async () => {
	const { formData } = await getGFFormData(GF_API_URL, 1, GF_CONSUMER_KEY, GF_CONSUMER_SECRECT);
	return {
		formData: formData
	};
};

export const actions = {
	default: async ({ request }) => {
		const { schema } = await getGFFormData(GF_API_URL, 1, GF_CONSUMER_KEY, GF_CONSUMER_SECRECT);
		const form = await superValidate(request, schema);

		// Convenient validation check:
		if (!form.valid) {
			// Again, return { form } and things will just work.
			return fail(400, { form });
		}

		const res = await sendGFSubmission(form.data, GF_API_URL, 1);
		// Convenient validation check:
		if (!res.is_valid) {
			// Again, return { form } and things will just work.
			return fail(400, { form });
		}

		// If you want to do something with the form data, you can do it here.
		// For example, you can send it to a database, or an API.
		// You can also do something with the response from the API.

		// If you want to redirect, you can do it here.

		// Yep, return { form } here too
		return { form };
	}
};
