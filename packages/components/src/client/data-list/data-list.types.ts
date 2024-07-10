import { type QueryFunction, type QueryKey } from '@tanstack/react-query';
import { type Dictionary, type ListIteratee, type ListIterator, type Many } from 'lodash';

import { type ListProps } from '../list/list.types';

export interface DataListProps<T> extends Omit<ListProps<T>, 'data'> {
	/**
	 * The query key for `@tanstack/react-query` query.
	 */
	queryKey: QueryKey;

	/**
	 * The function that fetches the data for `@tanstack/react-query` query.
	 */
	queryFn: QueryFunction<T[] | undefined, QueryKey, number> | undefined;

	/**
	 * A function that returns an object with keys of the groups and values of the items in that group.
	 * @param items - The items to group.
	 * @returns
	 */
	groupByFn?: (items: T[]) => Dictionary<T[]>;

	/**
	 * The list of iteratees by which to order the items. See [_orderBy](https://lodash.com/docs/4.17.15#orderBy).
	 */
	iteratees?: Many<ListIterator<T, unknown>> | Many<ListIteratee<T>>;

	/**
	 * The order of the sorted values. See [_orderBy](https://lodash.com/docs/4.17.15#orderBy).
	 */
	orders?: Many<boolean | 'asc' | 'desc'>;
}

/**
 * The props for the data list server component.
 * @template T The type of the item.
 * @prop `queryKey` - The query key for `@tanstack/react-query` query.
 * @prop `children` - The children to render.
 * @prop `initialData` - The initial data for the query.
 */
export interface DataListServerProps<T> {
	/**
	 * The query key for `@tanstack/react-query` query.
	 */
	queryKey: QueryKey;
	/**
	 * The children to render.
	 */
	children: React.ReactNode;
	/**
	 * The initial data for the query.
	 */
	initialData: T | Promise<T>;
}
