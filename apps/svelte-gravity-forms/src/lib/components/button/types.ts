/**
 * @ref https://docs.gravityforms.com/button/
 */
import type {
	ButtonType,
	Props as ButtonProps,
	Events as ButtonEvents
} from '$components/ui/button/index.js';

type Props = ButtonProps & {
	buttonType?: ButtonType;
	type?: string;
	text?: string;
	imageUrl?: string;
	width?: string;
	size?: string;
	location?: string;
	layoutGridColumnSpan?: number;
	id?: string;
};

type EventProps = {
	//..
} & ButtonEvents;

export type { Props, ButtonProps, EventProps };
