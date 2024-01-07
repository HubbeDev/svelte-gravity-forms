import type { GFFormObjectProps } from '$lib/internal/types.js';
import type { SuperValidated } from 'sveltekit-superforms';
import type { AnyZodObject, ZodObject, ZodTypeAny } from 'zod';

export type Props = {
	formId?: number;
	backendUrl?: string;
	consumerKey?: string;
	consumerSecret?: string;
	ssr?: boolean;
	formData?: GFFormObjectProps;
};
