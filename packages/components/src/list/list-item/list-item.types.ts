import { type BoxProps, type CompoundStylesApiProps, type ElementProps, type Factory } from '@mantine/core';
import { type VirtualItem } from '@tanstack/react-virtual';

import { type ListOrientation } from '../list.types';

export type ListItemStylesNames = 'item';

export type ListItemFactory = Factory<{
	props: ListItemProps;
	ref: HTMLLIElement;
	stylesNames: ListItemStylesNames;
	defaultComponent: 'li';
	compound: true;
}>;

/** Represents the props for a list item component. */
export interface ListItemProps extends BoxProps, CompoundStylesApiProps<ListItemFactory>, ElementProps<'li'> {
	/** Indicates whether the list item is active or not. */
	active?: boolean;
	/** The virtual row associated with the list item. */
	virtualRow?: VirtualItem;
	/** The orientation of the component. Can be either `vertical` or `horizontal`. */
	orientation?: ListOrientation;
	/** Indicates whether the component has an item border or not. */
	withItemBorder?: boolean;
	/** Indicates whether the component is virtualized or not. */
	virtualized?: boolean;
	/**
	 * Enable dynamic element measurement for virtualized item.
	 *
	 * @see [Virtualizer - TanStack Virtual Docs](https://tanstack.com/virtual/latest/docs/api/virtualizer#measureelement).
	 */
	measureElement?: boolean;
}
