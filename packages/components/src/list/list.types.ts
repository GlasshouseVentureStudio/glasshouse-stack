import {
	type BoxProps,
	type ElementProps,
	type Factory,
	type LoaderProps,
	type LoadingOverlayProps,
	type MantineRadius,
	type PaginationProps,
	type ScrollAreaProps,
	type StylesApiProps,
} from '@mantine/core';
// eslint-disable-next-line import/no-unresolved -- lodash is not a dependency, only using `@types/lodash` for types.
import { type Dictionary } from 'lodash';

import { type ScrollShadowProps } from '../scroll-shadow';

/**
 * Represents the type for a list group header.
 *
 * @template T - The type of items in the list group.
 */
export interface ListGroupHeaderType<T> {
	/**
	 * The title of the group item.
	 */
	title: string;
	/**
	 * The type of the item.
	 */
	type: 'group-header' | 'item';
	/**
	 * The items in the group item.
	 */
	items: T[];
}

export type ListStylesNames =
	| 'root'
	| 'scrollArea'
	| 'item'
	| 'list'
	| 'header'
	| 'footer'
	| 'loader'
	| 'empty'
	| 'paginationWrapper'
	| 'bottomLoaderWrapper'
	| 'groupHeader';

export interface ListCssVariables {
	root: '--list-radius';
}

export type ListFactory<T extends object> = Factory<{
	props: ListProps<T>;
	ref: HTMLDivElement;
	stylesNames: ListStylesNames;
	cssVariables: ListCssVariables;
}>;

export type ListOrientation = 'vertical' | 'horizontal';

/**
 * Props for the List component.
 *
 * @template T - The type of items in the list.
 */
export interface ListProps<T extends object>
	extends Omit<BoxProps, 'onChange'>,
		StylesApiProps<ListFactory<T>>,
		Omit<ElementProps<'div'>, 'onChange'> {
	radius?: MantineRadius;
	scrollShadowProps?: ScrollShadowProps;
	orientation?: ListOrientation;

	/**
	 * Whether the list should have root border.
	 */
	withBorder?: boolean;

	/**
	 * Whether the list should have item border.
	 */
	withItemBorder?: boolean;

	/**
	 * Whether the list should be infinite.
	 */
	infinite?: boolean;
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

	/**
	 * A function that renders the group header for each group in the list.
	 *
	 * @param header - The group header to render.
	 * @returns The React node representing the rendered group header.
	 */
	renderGroupHeader?: (header: ListGroupHeaderType<T>) => React.ReactNode;

	/**
	 * A function to estimate the size of each item in the list.
	 *
	 * @param item - The item to estimate the size for.
	 * @param index - The index of the item in the list.
	 * @returns The estimated size of the item.
	 */
	estimateItemSize: (item: T, index: number) => number;

	/**
	 * A function to estimate the size of each group header in the list.
	 *
	 * @param item - The group header to estimate the size for.
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
	 * An optional function to handle click events on list items.
	 *
	 * @param event - The click event.
	 * @param item - The clicked item.
	 * @param index - The index of the clicked item in the list.
	 */
	onItemClick?: (event: React.MouseEvent, item: T, index: number) => void;

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
	 * Props for the LoadingOverlay component.
	 */
	loadingOverlay?: LoadingOverlayProps;

	/**
	 * A function that returns an object with keys of the groups and values of the items in that group.
	 *
	 * @param items - The items to group.
	 * @returns An object with keys of the groups and values of the items in that group.
	 */
	groupByFn?: (items: T[]) => Dictionary<T[]>;

	/**
	 * Whether the group headers should be sticky.
	 */
	stickyGroupHeader?: boolean;

	/**
	 * Whether the list items are selectable.
	 */
	selectable?: boolean;

	/**
	 * The currently selected value.
	 */
	value?: T;

	/**
	 * A callback function that is called when the selected value changes.
	 *
	 * @param value - The new selected value.
	 */
	onChange?: (value: T) => void;

	/**
	 * A function that renders the loader component when the list is loading.
	 *
	 * @returns The React node representing the loader component.
	 */
	renderLoader?: () => React.ReactNode;

	/**
	 * A function that renders the empty state component when the list is empty.
	 *
	 * @returns The React node representing the empty state component.
	 */
	renderEmpty?: () => React.ReactNode;

	/**
	 * Configuration for pagination.
	 */
	pagination?: PaginationConfig;

	/**
	 * A function that is called when the end of the list is reached.
	 */
	onEndReached?: () => void;

	/**
	 * How far from the end the trailing edge of the list must be from the end of the content to trigger the `onEndReached` callback. Can have values similar to the CSS `margin` property, e.g. `"10px 20px 30px 40px"` (top, right, bottom, left). Default `256px`.
	 */
	onEndReachedThreshold?: string;

	/**
	 * Props for the bottom loader component.
	 */
	bottomLoaderProps?: LoaderProps;

	/**
	 * Whether the list is loading more items at the bottom.
	 */
	bottomLoading?: boolean;
}

/**
 * Configuration options for pagination.
 */
export type PaginationConfig = Omit<PaginationProps, ''> & {
	/**
	 * The position of the pagination component. Default `bottom`.
	 * - 'top': Display the pagination component at the top.
	 * - 'bottom': Display the pagination component at the bottom.
	 */
	position?: 'top' | 'bottom';

	/**
	 * The number of items to display per page.
	 */
	pageSize?: number;
};
