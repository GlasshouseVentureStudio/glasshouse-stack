import { type ListGroupHeaderType } from './list.types';

/**
 * Checks if the given item is an instance of `ListGroupHeaderType`.
 * @param item - The item to check.
 * @returns True if the item is an instance of `ListGroupHeaderType`, false otherwise.
 */
export const isListGroupHeader = <T extends object>(
	item: T | ListGroupHeaderType<T>
): item is ListGroupHeaderType<T> => {
	return 'type' in item && item.type === 'group-header';
};
