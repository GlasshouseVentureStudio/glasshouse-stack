import { type OmitComponentProps, type SlotsToClasses } from '@glasshouse/utils';
import {
	type BoxProps,
	type LoadingOverlayProps,
	type PaginationProps,
	type PolymorphicComponentProps,
	type ScrollAreaProps,
} from '@mantine/core';
import { type VirtualItem } from '@tanstack/react-virtual';
import { type Dictionary } from 'lodash';

import { type ListSlots, type ListVariantProps } from './list.styles';

export interface ListGroupHeaderType<T> {
	title: string;
	type: 'group-header' | 'item';
	items: T[];
}

type OmittedComponentProps<E extends React.ElementType> = Omit<React.ComponentPropsWithoutRef<E>, 'style' | 'onChange'>;
type OmittedScrollAreaProps = OmitComponentProps<ScrollAreaProps, 'classNames' | 'className' | 'onChange'>;

/**
 * Props for the List component.
 *
 * @template T - The type of items in the list.
 */
export interface ListProps<T extends object>
	extends OmittedComponentProps<'div'>,
		OmittedScrollAreaProps,
		ListVariantProps {
	/**
	 * An array of items to render in the list.
	 */
	data: T[];

	/**
	 * A function that renders each item in the list.
	 *
	 * @param item - The item to render.
	 * @param index - The index of the item in the list.
	 * @param style - The CSS styles to apply to the rendered item.
	 * @returns The React node representing the rendered item.
	 */
	renderItem: (item: T, index: number, active?: boolean) => React.ReactNode;

	renderGroupHeader?: (header: ListGroupHeaderType<T>) => React.ReactNode;

	/**
	 * A function to estimate the size of each item in the list.
	 *
	 * @param index - The index of the item in the list.
	 * @returns The estimated size of the item.
	 */
	estimateItemSize: (item: T, index: number) => number;

	/**
	 * A function to estimate the size of each group header in the list.
	 *
	 * @param index - The index of the group header in the list.
	 * @returns The estimated size of the group header.
	 */
	estimateGroupHeaderSize?: (item: ListGroupHeaderType<T>, index: number) => number;

	/**
	 * An optional function to extract a unique key for each item in the list.
	 *
	 * @param item - The item to extract the key from.
	 * @param index - The index of the item in the list.
	 * @returns The key for the item.
	 */
	itemKey: keyof T | ((item: T, index: number) => string | number);

	/**
	 * An optional function to determine if an item is active.
	 *
	 * @param item - The item to check.
	 * @param index - The index of the item in the list.
	 * @returns True if the item is active, false otherwise.
	 */
	getActiveItem?: (item: T, index: number) => boolean;

	/**
	 * Optional CSS class names for different slots of the List component.
	 */
	classNames?: SlotsToClasses<ListSlots>;

	/**
	 * An optional function to handle click events on list items.
	 *
	 * @param event - The click event.
	 * @param item - The clicked item.
	 * @param index - The index of the clicked item in the list.
	 */
	onItemClick?: (event: React.MouseEvent, item: T, index: number) => void;

	/**
	 * Whether the list should have a border.
	 */
	bordered?: boolean;

	/**
	 * Props for the viewport of the ScrollArea component.
	 */
	viewportProps?: ScrollAreaProps['viewportProps'];

	/**
	 * CSS class names for the ScrollArea component.
	 */
	scrollAreaClassNames?: ScrollAreaProps['classNames'];

	/**
	 * The header content of the list.
	 */
	header?: React.ReactNode;

	/**
	 * The footer content of the list.
	 */
	footer?: React.ReactNode;

	/**
	 * Whether the header should be sticky.
	 */
	stickyHeader?: boolean;

	/**
	 * Whether the footer should be sticky.
	 */
	stickyFooter?: boolean;

	/**
	 * Whether the list is loading more items.
	 */
	loading?: boolean;

	/**
	 * Props for the [LoadingOverlay](https://mantine.dev/core/loading-overlay/?t=props).
	 */
	loadingOverlay?: LoadingOverlayProps;

	/**
	 * A function that returns an object with keys of the groups and values of the items in that group.
	 * @param items - The items to group.
	 * @returns
	 */
	groupByFn?: (items: T[]) => Dictionary<T[]>;

	/**
	 * Whether the group headers should be sticky.
	 */
	stickyGroupHeader?: boolean;
	selectable?: boolean;
	value?: T;
	onChange?: (value: T) => void;
	renderLoader?: () => React.ReactNode;
	renderEmpty?: () => React.ReactNode;
	pagination?: PaginationConfig;
}

export type PaginationConfig = Omit<PaginationProps, ''> & {
	position?: 'top' | 'bottom';
	pageSize?: number;
};

export interface ListItemProps extends PolymorphicComponentProps<'li', BoxProps> {
	virtualRow: VirtualItem<Element>;
	active?: boolean;
}

export interface ListGroupHeaderProps extends PolymorphicComponentProps<'li', BoxProps> {
	virtualRow: VirtualItem<Element>;
	orientation: 'vertical' | 'horizontal';
	isSticky: (index: number) => boolean | undefined;
	isActiveSticky: (index: number) => boolean | undefined;
}
