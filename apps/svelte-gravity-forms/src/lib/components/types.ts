import type { GFFormObjectProps } from '$lib/internal/types.js';

export type Props = {
	formId?: number;
	backendUrl?: string;
	consumerKey?: string;
	consumerSecret?: string;
	ssr?: boolean;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	form?: GFFormObjectProps;
};
