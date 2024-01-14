import type { GFFormObjectProps } from '$lib/internal/types.js';

export type Props = {
	formId?: number;
	backendUrl?: string;
	consumerKey?: string;
	consumerSecret?: string;
	ssr?: boolean;
	formData?: GFFormObjectProps;
	form?: unknown;
};
