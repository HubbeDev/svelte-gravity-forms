export type GFFieldsProps = {
	type?: string;
	id?: number;
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
	choices?: string;
	conditionalLogic?: string;
	productField?: string;
	layoutGridColumnSpan?: string;
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
	fields?: GFFieldsProps[];
	button?: GFButtonProps[];
	notifications?: unknown[];
	confirmations?: unknown[];
	confirmation?: unknown[];
	save?: unknown[];
	personalData?: unknown[];
	pagination?: unknown[];
	lastPageButton?: unknown[];
	nextFieldId?: number;
};
