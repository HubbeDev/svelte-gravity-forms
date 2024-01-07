import { get, writable, type Writable } from 'svelte/store';
import type { GFFormObjectProps, GFSubmissionResponse } from './internal/types.js';

import OAuth from 'oauth-1.0a';
import CryptoJS from 'crypto-js';
import { generateFormSchema } from './internal/helpers/schema.js';

export async function sendGFSubmission(
	req: { [x: string]: unknown },
	backendUrl: string,
	formId: number
) {
	const res = await fetch(`${backendUrl}gf/v2/forms/${formId}/submissions`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json;charset=UTF-8'
		},
		body: JSON.stringify(req)
	});
	const data = (await res.json()) as GFSubmissionResponse;
	return data;
}

export async function fetchGFForm(
	backendUrl: Writable<string | undefined>,
	formId: Writable<number>,
	consumer_key: Writable<string>,
	consumer_secret: Writable<string>
) {
	const oauth = new OAuth({
		consumer: {
			key: get(consumer_key),
			secret: get(consumer_secret)
		},
		signature_method: 'HMAC-SHA1',
		hash_function(base_string, key) {
			return CryptoJS.HmacSHA1(base_string, key).toString(CryptoJS.enc.Base64);
		}
	});

	// Generate OAuth 1.0 parameters
	const oauthData = oauth.authorize({
		url: `${get(backendUrl)}gf/v2/forms/${get(formId)}`,
		method: 'GET'
	});

	// Convert OAuth parameters to URL parameters
	const params = new URLSearchParams({
		oauth_consumer_key: oauthData.oauth_consumer_key,
		oauth_nonce: oauthData.oauth_nonce,
		oauth_signature_method: oauthData.oauth_signature_method,
		oauth_timestamp: oauthData.oauth_timestamp.toString(),
		oauth_version: oauthData.oauth_version,
		oauth_signature: oauthData.oauth_signature
	});

	// Append OAuth parameters to URL
	const url = `${get(backendUrl)}gf/v2/forms/${get(formId)}?${params.toString()}`;

	const res = await fetch(url, { method: 'GET' });
	// eslint-disable-next-line no-console
	const data = (await res.json()) as GFFormObjectProps;
	return data;
}

/**
 *
 */
export async function getGFFormData(
	backendUrl: string,
	formId: number,
	consumer_key: string,
	consumer_secret: string
) {
	const backendUrlStore = writable(backendUrl);
	const formIdStore = writable(formId);
	const consumer_keyStore = writable(consumer_key);
	const consumer_secretStore = writable(consumer_secret);

	const formData = await fetchGFForm(
		backendUrlStore,
		formIdStore,
		consumer_keyStore,
		consumer_secretStore
	);

	const schema = generateFormSchema(formData);
	return {
		formData,
		schema
	};
}
