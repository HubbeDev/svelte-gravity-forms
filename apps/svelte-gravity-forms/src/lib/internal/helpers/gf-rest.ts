import { get, type Writable } from 'svelte/store';
import type { GFFormObjectProps } from '../types.js';

export async function sendSubmission(
	req: { [x: string]: unknown },
	backendUrl: Writable<string | undefined>,
	formId: Writable<number>
) {
	const res = await fetch(`${get(backendUrl)}gravityforms/v2/forms/${get(formId)}/submissions`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json;charset=UTF-8'
		}
	});
	const data = await res.json();
	return data;
}

export async function getFormObject(
	backendUrl: Writable<string | undefined>,
	formUrl: Writable<string>,
	formId: Writable<number>
) {
	const res = await fetch(`${get(backendUrl)}${get(formUrl)}/forms/${get(formId)}`, {
		method: 'GET'
	});
	// eslint-disable-next-line no-console
	console.log(res);
	const data = (await res.json()) as GFFormObjectProps;
	return data;
}
