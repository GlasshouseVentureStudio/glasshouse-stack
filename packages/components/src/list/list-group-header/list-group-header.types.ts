import { type BoxProps, type CompoundStylesApiProps, type ElementProps, type PolymorphicFactory } from '@mantine/core';
import { type VirtualItem } from '@tanstack/react-virtual';

import { type ListOrientation } from '../list.types';

export type ListGroupHeaderStylesNames = 'item';

export type ListGroupHeaderFactory = PolymorphicFactory<{
	props: ListGroupHeaderProps;
	defaultComponent: 'li';
	defaultRef: HTMLLIElement;
	stylesNames: ListGroupHeaderStylesNames;
	compound: true;
}>;

/**
 * Props for the ListGroupHeader component.
 */
export interface ListGroupHeaderProps
	extends BoxProps,
		CompoundStylesApiProps<ListGroupHeaderFactory>,
		ElementProps<'li'> {
	/**
	 * The virtual row associated with the ListGroupHeader.
	 */
	virtualRow: VirtualItem;

	/**
	 * The orientation of the ListGroupHeader.
	 * Can be either 'vertical' or 'horizontal'.
	 */
	orientation: ListOrientation;

	withItemBorder?: boolean;
	sticky?: boolean;
}
