import type { GFFormObjectProps } from '$lib/internal/types.js';
import type { SuperValidated } from 'formsnap';
import type { AnyZodObject } from 'zod';

export type Props = {
	formId?: number;
	backendUrl?: string;
	consumerKey?: string;
	consumerSecret?: string;
	ssr?: boolean;
	formData?: GFFormObjectProps;
	form?: SuperValidated<AnyZodObject, unknown>;
};
