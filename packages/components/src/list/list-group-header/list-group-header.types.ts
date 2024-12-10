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
	/** The orientation of the component. Can be either `vertical` or `horizontal`. */
	orientation: ListOrientation;
	/** The virtual row associated with the ListGroupHeader.*/
	virtualRow?: VirtualItem;
	/** Indicates whether the component has an item border or not. */
	withItemBorder?: boolean;
	/** Indicates whether the component is sticky or not. */
	sticky?: boolean;
	/** Indicates whether the component is virtualized or not. */
	virtualized?: boolean;
	/**
	 * Enable dynamic element measurement for virtualized item.
	 *
	 * @see [Virtualizer - TanStack Virtual Docs](https://tanstack.com/virtual/latest/docs/api/virtualizer#measureelement).
	 */
	measureElement?: boolean;
}
