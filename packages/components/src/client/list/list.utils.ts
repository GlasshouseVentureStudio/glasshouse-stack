import { type ListGroupHeader } from './list.types';

/**
 * Checks if the given item is an instance of `ListGroupHeader`.
 * @param item - The item to check.
 * @returns True if the item is an instance of `ListGroupHeader`, false otherwise.
 */
export const isListGroupHeader = <T extends object>(item: T | ListGroupHeader<T>): item is ListGroupHeader<T> => {
	return 'type' in item && item.type === 'group-header';
};
