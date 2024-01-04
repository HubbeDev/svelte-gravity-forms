/**
 * @ref https://docs.gravityforms.com/button/
 */
import type {
	ButtonType,
	Props as ButtonProps,
	Events as ButtonEvents
} from '$components/ui/button/index.js';

type Props = {
	buttonType?: ButtonType;
	type?: string;
	text?: string;
	imageUrl?: string;
	width?: string;
	location?: string;
	layoutGridColumnSpan?: number;
	id?: string;
};

type EventProps = {
	//..
} & ButtonEvents;

export type { Props, ButtonProps, EventProps };
