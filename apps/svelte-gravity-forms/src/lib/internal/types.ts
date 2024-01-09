export type GFFieldChoiceProps = {
	text: string;
	value: string;
	isSelected: boolean;
	price: string;
};

export type GFFieldProps = {
	type?: string;
	id: number;
	formId?: number;
	label?: string;
	adminLabel?: string;
	isRequired?: boolean;
	size?: string;
	errorMessage?: string;
	visibility?: string;
	inputs?: null;
	description?: string;
	allowsPrepopulate?: boolean;
	inputMask?: boolean;
	inputMaskValue?: string;
	inputMaskIsCustom?: boolean;
	maxLength?: string;
	inputType?: string;
	labelPlacement?: string;
	descriptionPlacement?: string;
	subLabelPlacement?: string;
	placeholder?: string;
	cssClass?: string;
	inputName?: string;
	noDuplicates?: boolean;
	defaultValue?: string;
	enableAutocomplete?: boolean;
	autocompleteAttribute?: string;
	choices?: GFFieldChoiceProps[];
	conditionalLogic?: string;
	productField?: string;
	layoutGridColumnSpan?: number;
	enablePasswordInput?: boolean;
	enableEnhancedUI?: number;
	layoutGroupId?: string;
	multipleFiles?: boolean;
	maxFiles?: string;
	calculationFormula?: string;
	calculationRounding?: string;
	enableCalculation?: string;
	disableQuantity?: boolean;
	displayAllCategories?: boolean;
	useRichTextEditor?: boolean;
	errors?: unknown[];
	checkboxLabel?: string;
	pageNumber?: number;
	rangeMin?: string;
	rangeMax?: string;
	fields?: string;
};

export type GFButtonProps = {
	type?: 'text';
	text?: string;
	imageUrl?: string;
	conditionalLogic?: null;
	width?: 'auto' | 'full';
	location?: 'bottom' | 'inline';
	layoutGridColumnSpan?: number;
	id?: string;
};

export type GFComfirmationProps = {
	type?: string;
	id?: string;
	isDefault?: boolean;
	message?: string;
	name?: string;
	disableAutoformat?: boolean;
	pageId?: number;
	url?: string;
	queryString?: string;
};

/**
 * @todo: fix any types in this file
 */
export type GFFormObjectProps = {
	id?: number;
	title?: string;
	description?: string;
	date_created?: string;
	date_updated?: string;
	is_active?: boolean;
	is_trash?: boolean;
	labelPlacement?: string;
	requiredIndicator?: string;
	version?: string;
	fields?: GFFieldProps[];
	button?: GFButtonProps;
	notifications?: unknown[];
	confirmations?: GFComfirmationProps[];
	confirmation?: unknown[];
	save?: unknown[];
	personalData?: unknown[];
	pagination?: unknown[];
	lastPageButton?: unknown[];
	nextFieldId?: number;
	descriptionPlacement?: string;
};

export type FieldValuesProps = {
	[key: string]: unknown;
};

export type GFSubmissionRequestPrps = {
	/**
	 *  An object of dynamic population parameter keys with their corresponding values used to populate the fields.
	 * Useful for evaluating conditional logic rules to determine which fields should be validated and saved.
	 */
	field_values: FieldValuesProps;
	/**
	 * Default is 0. For multi-page forms; indicates which page would be loaded next if the current page passes validation
	 */
	target_page?: number;

	/**
	 * Default is 1. For multi-page forms; indicates which page was active when the values were submitted for validation.
	 */
	source_page?: number;
};

export type GFSubmissionResponse = {
	/**
	 * The form validation result.
	 */
	is_valid?: boolean;

	/**
	 * Only present when is_valid is false. An array of validation messages for the fields that failed validation.
	 */
	validation_messages?: FieldValuesProps[] | object;

	/**
	 * For multi-page forms. The page that should be displayed.
	 */
	page_number?: number;

	/**
	 * For multi-page forms. The page that was submitted.
	 */
	source_page_number?: number;

	/**
	 * Only present when is_valid is true. The resume or confirmation message.
	 */
	confirmation_message?: string;

	/**
	 * Only present when is_valid is true. The type of confirmation being used for the current submission. message or redirect
	 */
	confirmation_type?: string;

	/**
	 * Only present when is_valid is true and the confirmation_type is redirect. The URL the submission should redirect to.
	 */
	confirmation_redirect?: string;

	/**
	 * Only present when is_valid is true and the user authenticating the request has permission to view or edit entries. The ID of the entry created by the submission.
	 */
	entry_id?: number;

	/**
	 * Only present if the value of the gform_save input in the request body was true. The token that can be used to repopulate the embedded form with the saved values.
	 */
	resume_token?: string;
};
