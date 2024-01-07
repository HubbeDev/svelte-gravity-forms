import { get, type Writable } from 'svelte/store';
import type { GFFormObjectProps, GFSubmissionResponse } from '../types.js';

import OAuth from 'oauth-1.0a';
import CryptoJS from 'crypto-js';

export async function sendSubmission(
	req: { [x: string]: unknown },
	backendUrl: Writable<string | undefined>,
	formId: Writable<number>
) {
	const res = await fetch(`${get(backendUrl)}gf/v2/forms/${get(formId)}/submissions`, {
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

export async function getClientFormObject(
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
	console.log(res);
	const data = (await res.json()) as GFFormObjectProps;
	return data;
}
