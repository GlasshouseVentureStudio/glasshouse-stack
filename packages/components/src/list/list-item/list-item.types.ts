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

/**
 * Represents the props for a list item component.
 */
export interface ListItemProps extends BoxProps, CompoundStylesApiProps<ListItemFactory>, ElementProps<'li'> {
	/**
	 * The virtual row associated with the list item.
	 */
	virtualRow: VirtualItem;

	/**
	 * Indicates whether the list item is active or not.
	 */
	active?: boolean;
	orientation?: ListOrientation;
	withItemBorder?: boolean;
}
