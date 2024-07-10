/**
 * Props for the List component.
 *
 * @template T The type of items in the list.
 */

import { type SlotsToClasses } from '@glasshouse/utils';
import { type ScrollAreaProps } from '@mantine/core';

import { type ListSlots, type ListVariantProps } from './list.styles';

type OmittedComponentProps<T extends React.ElementType> = Omit<React.ComponentPropsWithoutRef<T>, 'style'>;
type OmittedScrollAreaProps = Omit<ScrollAreaProps, 'classNames' | 'className'>;

/**
 * Props for the List component.
 */
/**
 * Props for the List component.
 *
 * @template T - The type of items in the list.
 */
export interface ListProps<T> extends OmittedComponentProps<'div'>, OmittedScrollAreaProps, ListVariantProps {
	/**
	 * An array of items to render in the list.
	 */
	data: T[];

	/**
	 * A function that renders each item in the list.
	 *
	 * @param item - The item to render.
	 * @param index - The index of the item in the list.
	 * @returns The React node representing the rendered item.
	 */
	renderItem?: (item: T, index: number) => React.ReactNode;

	/**
	 * An optional function to extract a unique key for each item in the list.
	 *
	 * @param item - The item to extract the key from.
	 * @param index - The index of the item in the list.
	 * @returns The key for the item.
	 */
	itemKey?: keyof T | ((item: T, index: number) => string | number);

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
	 * An optional function to get the label for each item in the list.
	 *
	 * @param item - The item to get the label from.
	 * @param index - The index of the item in the list.
	 * @returns The label for the item.
	 */
	getItemLabel?: (item: T, index: number) => React.ReactNode;

	/**
	 * An optional function to handle click events on list items.
	 *
	 * @param e - The click event.
	 * @param item - The clicked item.
	 * @param index - The index of the clicked item in the list.
	 */
	onItemClick?: (event: React.MouseEvent<HTMLLIElement>, item: T, index: number) => void;

	/**
	 * Whether the list should have a border.
	 */
	bordered?: boolean;
	listClassNames?: ScrollAreaProps['classNames'];
}
